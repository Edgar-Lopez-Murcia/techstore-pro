const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Transaccion = sequelize.define('Transaccion', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    wompiReference: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    amountInCents: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING(10),
        defaultValue: 'COP'
    },
    status: {
        type: DataTypes.ENUM('PENDING', 'APPROVED', 'DECLINED', 'VOIDED', 'ERROR'),
        defaultValue: 'PENDING'
    },
    wompiTransactionId: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    orden_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    // Guardamos la información temporal del carrito como Texto Largo en formato JSON
    pendingOrderData: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'transacciones',
    timestamps: true
});

module.exports = Transaccion;
