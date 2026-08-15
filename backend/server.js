// 1. Importar Las dependencias
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

const Producto = require('./models/Producto')

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

// 6. Ruta de prueba 
app.get('/', (req,res) => {
    res.json({mensaje: 'Servidor TechStore Pro✅'});
});

// 7. Arrancar Servidor
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});