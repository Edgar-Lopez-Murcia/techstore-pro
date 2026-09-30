const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuración adaptada con el Socket oficial de XAMPP para macOS
const sequelize = new Sequelize(
    process.env.DB_NAME || 'techstore_pro',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '', 
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: false, 
        dialectOptions: {
            // Ajuste crucial: Obliga a Sequelize a conectarse por el socket interno de tu Mac
            socketPath: '/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock'
        }
    }
);

const conectarDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión exitosa a MySQL (XAMPP) en Mac con Sequelize.');
        
        // Sincroniza las tablas de forma segura
        await sequelize.sync({ alter: true });
    } catch (error) {
        console.error('❌ Error detallado de conexión a MySQL:', error.message);
        process.exit(1);
    }
};

module.exports = { sequelize, conectarDB };

