// 1. Importar Las dependencias

const express = require('express');
const cors = require('cors');

// 2. Crear la aplicación y definir el puerto
const app = express();
const PORT = 3000;

// 3. Activar middlewares
app.use(cors());
app.use(express.json());

// 4. Ruta GET /api/productos
app.get('/api/productos',(req,res) => {
    const productos = require('../frontend/data/productos.json');
    res.json(productos); 
});

// 5. Ruta de prueba
app.get('/', (req,res) => {
    res.json({mensaje: 'Servidor TechStore Pro✅'});
});

// 6. Arrancar Servidor
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});