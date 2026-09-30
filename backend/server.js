// 1. Importar las dependencias
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { conectarDB } = require('./config/db'); // Importamos la nueva conexión a MySQL

// Importar Rutas
const authRoutes = require('./routes/auth');
const productosRoutes = require('./routes/productos');
const ordenesRoutes = require('./routes/ordenes');
const pagoRoutes = require('./routes/pago');

// 2. Crear la aplicación y definir el puerto
const app = express();
const PORT = process.env.PORT || 3000;

// 3. Activar middlewares
app.use(cors());
app.use(express.json());

// 4. Conectar a MySQL (XAMPP) vía Sequelize
conectarDB();

// 9. Ruta de prueba 
app.get('/', (req, res) => {
    res.json({ mensaje: 'Servidor TechStore Pro corriendo en MySQL ✅' });
});

// 11. Vinculación de Endpoints y API Routes
app.use('/api/auth', authRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/ordenes', ordenesRoutes);
app.use('/api/pagos', pagoRoutes);

// 10. Arrancar Servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor listo en http://localhost:${PORT}`);
});
