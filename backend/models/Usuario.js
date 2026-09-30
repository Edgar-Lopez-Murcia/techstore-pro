const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    rol: {
        type: DataTypes.ENUM('admin', 'cliente'),
        defaultValue: 'cliente'
    },
    departamento: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    municipio: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'usuarios',
    timestamps: true // Esto genera automáticamente createdAt y updatedAt
});

module.exports = Usuario;
