// 1. Importar Las dependencias
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Producto = require('./models/Producto');
const authRoutes = require('./routes/auth');
const verificarToken = require('./middleware/auth')

// 2. Crear la aplicación y definir el puerto
const app = express();
const PORT = process.env.PORT || 3000;

// 3. Activar middlewares
app.use(cors());
app.use(express.json());

// 4. Conectar a MongoDB Atlas  
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Conectado a MongoDB Atlas'))
    .catch((err) => console.error('❌ Error de coneccion: ', err))


// 5. Ruta GET /apiproductos - ahora lee de MongoDB Atlas
app.get('/api/productos', async (req,res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (err) {
        res.status(500).json({erros: 'Error al obtener productos'})
    }
});

// 6. Ruta POST /api/productos - Crear un producto nuevo 
app.post('/api/productos',  verificarToken, async (req,res) => {
    try {
        const nuevoProducto = await Producto.create(req.body);
        res.status(201).json(nuevoProducto);
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
});

// 7. Ruta PUT /api/productos/:id - actualizar un producto
app.put('/api/productos/:id',  verificarToken, async (req,res) => {
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

// 8. Ruta DELETE /api/productos/:id - eliminar un producto
app.delete('/api/productos/:id',  verificarToken, async (req,res) => {
    try{
        const eliminado = await Producto.findByIdAndDelete(req.params.id,);
        if (!eliminado) return res.status(404).json({ error: 'Producto no encontrado'});
        res.json({ mensaje: 'producto eliminado correctamente', eliminado});
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
});

// 9. Ruta de prueba 
app.get('/', (req,res) => {
    res.json({mensaje: 'Servidor TechStore Pro✅'});
});

// 10. Arrancar Servidor
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});

// 11. Rutas de autenticacion
app.use('/api/auth', authRoutes);