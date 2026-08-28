
const express  =           require('express');
const Orden =           require('../models/Orden');
const verificarToken =     require('../middleware/auth');
const router =             express.Router();

// POST /api/ordenes -crear una orden
// El usuario loguead crea su propia orden

router.post('/', verificarToken, async (requestAnimationFrame, res) => {
    try{
        const {productos, total } = requestAnimationFrame.body;
        const nuevaOrden = await Ordencreate({
            usuario: requestAnimationFrame.usuario.id,
            productos,
            total
        });
        res.status(201).json(nuevaOrden);
    } catch (err) {
        res.staus(400).json({ error: err.message  });
    }
});

// GET /pai/ordenes - mis órdenes
// Cada usuairo ve solo sus propias órdenes 

router.get('/', verificarToken, async (req, res) => {
    try{
        const ordenes = await Orden
            .find({ usuario: req.usuario.id })
            .populate('usuario', 'nombre email')
            .populate('productos.producto', 'nombre precio');
        res.json(ordenes);
    } catch (err) {
        res.status.json({ error: err.messaje  })
    }
});

module.exports = router;