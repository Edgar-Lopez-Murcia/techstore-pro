const express = require('express');
const crypto = require('crypto');
const Orden = require('../models/Orden');
const DetalleOrden = require('../models/DetalleOrden');
const Transaccion = require('../models/Transaccion');
const verificarToken = require('../middleware/auth');
const router = express.Router();

// Función auxiliar: Crea la orden relacional cuando Wompi confirma APPROVED
async function confirmarAprobado(transaccion, wompiTx) {
    transaccion.status = wompiTx.status;
    transaccion.wompiTransactionId = wompiTx.id;

    if (wompiTx.status === 'APPROVED' && !transaccion.orden_id) {
        // Parseamos el texto JSON guardado temporalmente para recuperar el objeto real
        const pod = JSON.parse(transaccion.pendingOrderData);
        
        // 1. Crear la Orden General
        const orden = await Orden.create({
            usuario_id: pod.usuario,
            total: pod.total,
            wompiTransactionId: wompiTx.id,
            wompiReference: wompiTx.reference,
            estado: 'PAGO_CONFIRMADO'
        });

        // 2. Desglosar el carrito en la tabla intermedia detalle_orden
        if (pod.productos && pod.productos.length > 0) {
            const detalles = pod.productos.map(item => ({
                orden_id: orden.id,
                producto_id: item.producto,
                cantidad: item.cantidad || 1
            }));
            await DetalleOrden.bulkCreate(detalles);
        }

        transaccion.orden_id = orden.id;
    }
    await transaccion.save();
}

// POST /api/pagos/firma - Generar firmas de integridad para el Widget de Wompi
router.post('/firma', verificarToken, async (req, res) => {
    const { productos, total } = req.body;
    if (!productos?.length || !total) {
        return res.status(400).json({ error: 'Carrito vacío o total inválido' });
    }
    try {
        const reference = `TS-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
        const amountInCents = Math.round(total * 100);
        const currency = 'COP';

        const raw = `${reference}${amountInCents}${currency}${process.env.WOMPI_INTEGRITY_SECRET}`;
        const signature = crypto.createHash('sha256').update(raw).digest('hex');

        // Convertimos el objeto dinámico del carrito a un String JSON para la columna TEXT
        const pendingDataText = JSON.stringify({ usuario: req.usuario.id, productos, total });

        await Transaccion.create({
            wompiReference: reference,
            amountInCents,
            currency,
            status: 'PENDING',
            pendingOrderData: pendingDataText
        });

        res.json({
            reference, amountInCents, currency, signature,
            publicKey: process.env.WOMPI_PUBLIC_KEY
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al generar la firma en MySQL' });
    }
});

// GET /api/pagos/estado/:reference - Polling de verificación de pagos
router.get('/estado/:reference', verificarToken, async (req, res) => {
    try {
        const tx = await Transaccion.findOne({ where: { wompiReference: req.params.reference } });
        if (!tx) return res.status(404).json({ error: 'Transacción no encontrada' });

        if (tx.status === 'PENDING') {
            const wompiRes = await fetch(
                `https://production.wompi.co/v1/transactions?reference=${tx.wompiReference}`,
                { headers: { Authorization: `Bearer ${process.env.WOMPI_PRIVATE_KEY}` } }
            );
            if (wompiRes.ok) {
                const wompiJson = await wompiRes.json();
                const wompiTx = wompiJson.data?.[0];
                if (wompiTx && wompiTx.status !== 'PENDING') {
                    await confirmarAprobado(tx, wompiTx);
                }
            }
        }
        res.json({ status: tx.status, ordenId: tx.orden_id ?? null });
    } catch (err) {
        console.error("Error completo en la consola:", err);
        res.status(500).json({ error: 'Error interno de polling' });
    }
});


module.exports = router;
