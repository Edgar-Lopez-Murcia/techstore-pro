const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Usuario = require('./Usuario'); // Importamos usuarios para crear la relación

const Orden = sequelize.define('Orden', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario, // Crea el vínculo lógico directo con la tabla usuarios
            key: 'id'
        }
    },
    total: {
        type: DataTypes.DECIMAL(12, 2), // Guarda el valor monetario de forma precisa (ej: 4299000.00)
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('pendiente', 'procesando', 'enviado', 'entregado', 'PAGO_CONFIRMADO'),
        defaultValue: 'pendiente'
    },
    wompiTransactionId: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    wompiReference: {
        type: DataTypes.STRING(100),
        allowNull: true
    }
}, {
    tableName: 'ordenes',
    timestamps: true // Habilita automáticamente createdAt y updatedAt
});

// DEFINICIÓN DE RELACIONES (Asociaciones de Sequelize)
// Una orden pertenece obligatoriamente a un único usuario (Relación 1 a Muchos)
Orden.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'cliente' });

module.exports = Orden;
