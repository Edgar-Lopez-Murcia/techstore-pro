
// 1. Importar Las dependencias

const express  =           require('express');
const Producto =           require('../models/Producto');
const verificarToken =     require('../middleware/auth');
const verificarAdmin =     require('../middleware/admin');
const router =             express.Router();


// 2. GET / -público, sin token
router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (err) {
        res.status(500).json({erros: 'Error al obtener productos'});
    }
});

// 2b. GET /:id -un solo producto por su _id (público, no requiere token)
// Ejemplo de URL: GET https://localhost:300/api/producto/64a1b2c3d4e5f6a7b8c8d0e1
router.get('/:id', async (req,res) =>{
    try {
        // req.params.id lee el valor que llega en La URL después de 7API7productos/
        const producto = await Producto.findById(req.params.id);

        // Si MongoDB no encontró nada con ese _id, productos es null 404
        if (!producto) return res.status(404).json({ error: 'Producto no encontrado'});

        res.json(producto); // 2002 OK - devuelve el objeto producto

    } catch (err) {
        // EL cath atrapa el Cast Error de Mongoose cuando el _id tiene formato inválido
        // (cualquier texto que no sea un ObjetId de 24 caracteres hexadecimales)
        res.status(404).json({ error: 'Producto no encontrado'});
    }
} );


// 3. POST / solo admin (verificarToken + verificarAdmin)
router.post('/',  verificarToken, verificarAdmin, async (req,res) => {
    try {
        const nuevo = await Producto.create(req.body);
        res.status(201).json(nuevo);
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
});

// 4. PUT /:id -solo admin
router.put('/:id',  verificarToken, verificarAdmin, async (req,res) => {
    try{
        const actualizado = await Producto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true}
        );
        if (!actualizado) return res.status(404).json({ error: 'Producto no encontrado'});
        res.json(actualizado);
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
});

// 5. DELETE /:id -solo admin
router.delete('/:id',  verificarToken,verificarAdmin, async (req,res) => {
    try{
        const eliminado = await Producto.findByIdAndDelete(req.params.id,);
        if (!eliminado) return res.status(404).json({ error: 'Producto no encontrado'});
        res.json({ mensaje: 'producto eliminado correctamente', eliminado});
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
});

// 6. Exportar
module.exports = router;
