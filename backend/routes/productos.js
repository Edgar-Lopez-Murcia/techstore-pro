const express = require('express');
const Producto = require('../models/Producto');
const verificarToken = require('../middleware/auth');
const verificarAdmin = require('../middleware/admin');
const router = express.Router();

// 2. GET /api/productos - Obtener todos los artículos (Público, sin token)
router.get('/', async (req, res) => {
    try {
        // En Sequelize, findAll() equivale al .find() de Mongoose
        const productos = await Producto.findAll();
        res.json(productos);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener productos de MySQL' });
    }
});

// 2b. GET /api/productos/:id - Obtener un solo producto por su ID (Público)
router.get('/:id', async (req, res) => {
    try {
        // findByPk busca directamente por la Llave Primaria (Primary Key) numérica
        const producto = await Producto.findByPk(req.params.id);
        
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(producto);
    } catch (err) {
        res.status(404).json({ error: 'Producto no encontrado o ID inválido' });
    }
});

// 3. POST /api/productos - Solo Administradores (Crear nuevo producto)
router.post('/', verificarToken, verificarAdmin, async (req, res) => {
    try {
        const nuevo = await Producto.create(req.body);
        res.status(201).json(nuevo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 4. PUT /api/productos/:id - Solo Administradores (Editar producto)
router.put('/:id', verificarToken, verificarAdmin, async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.params.id);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Actualiza los campos en MySQL con los datos recibidos
        await producto.update(req.body);
        res.json(producto);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 5. DELETE /api/productos/:id - Solo Administradores (Eliminar producto)
router.delete('/:id', verificarToken, verificarAdmin, async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.params.id);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Elimina el registro físico de la tabla productos
        await producto.destroy();
        res.json({ mensaje: 'Producto eliminado correctamente de MySQL' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
