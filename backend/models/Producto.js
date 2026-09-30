const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// Definición de la estructura de la tabla productos en MySQL
const Producto = sequelize.define('Producto', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_tienda: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true // Conserva tu ID corto único (ej: 2)
    },
    icono: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    nombre: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    precio: {
        type: DataTypes.STRING(30), // Conserva el formato de texto como "$4.299.000"
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'productos',
    timestamps: false // No requiere columnas de fecha si tu esquema original no las tenía
});

module.exports = Producto;
