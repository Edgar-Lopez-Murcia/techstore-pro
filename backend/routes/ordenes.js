const express = require('express');
const Orden = require('../models/Orden');
const DetalleOrden = require('../models/DetalleOrden');
const Producto = require('../models/Producto');
const Usuario = require('../models/Usuario');
const verificarToken = require('../middleware/auth');
const verificarAdmin = require('../middleware/admin');
const router = express.Router();

// 1. POST /api/ordenes - Crear una nueva orden
router.post('/', verificarToken, async (req, res) => {
    try {
        const { productos, total } = req.body;

        // Paso A: Crear el registro global en la tabla 'ordenes'
        const nuevaOrden = await Orden.create({
            usuario_id: req.usuario.id,
            total: total
        });

        // Paso B: Insertar cada producto del carrito en la tabla intermedia 'detalle_orden'
        if (productos && productos.length > 0) {
            const detalles = productos.map(item => ({
                orden_id: nuevaOrden.id,
                producto_id: item.producto, // ID numérico de tu producto en MySQL
                cantidad: item.cantidad || 1
            }));
            await DetalleOrden.bulkCreate(detalles); // Inserta todas las filas en un solo paso
        }

        res.status(201).json(nuevaOrden);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 2. GET /api/ordenes - Ver mis órdenes (Cada usuario ve solo lo suyo)
router.get('/', verificarToken, async (req, res) => {
    try {
        const ordenes = await Orden.findAll({
            where: { usuario_id: req.usuario.id },
            include: [
                { model: Usuario, as: 'cliente', attributes: ['nombre', 'email'] },
                { 
                    model: DetalleOrden, 
                    as: 'detalles',
                    include: [{ model: Producto, as: 'articulo', attributes: ['nombre', 'precio'] }]
                }
            ]
        });
        res.json(ordenes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. GET /api/ordenes/admin/todas - El administrador ve todas las órdenes
router.get('/admin/todas', verificarToken, verificarAdmin, async (req, res) => {
    try {
        const ordenes = await Orden.findAll({
            order: [['createdAt', 'DESC']],
            include: [
                { model: Usuario, as: 'cliente', attributes: ['nombre', 'email'] },
                { 
                    model: DetalleOrden, 
                    as: 'detalles',
                    include: [{ model: Producto, as: 'articulo', attributes: ['nombre', 'precio'] }]
                }
            ]
        });
        res.json(ordenes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. PATCH /api/ordenes/:id/estado - Cambiar estado (Solo Admin)
router.patch('/:id/estado', verificarToken, verificarAdmin, async (req, res) => {
    try {
        const { estado } = req.body;
        const orden = await Orden.findByPk(req.params.id);
        
        if (!orden) return res.status(404).json({ error: 'Orden no encontrada' });

        await orden.update({ estado });
        res.json(orden);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
