const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Orden = require('./Orden');
const Producto = require('./Producto');

const DetalleOrden = sequelize.define('DetalleOrden', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    orden_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Orden,
            key: 'id'
        }
    },
    producto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Producto,
            key: 'id'
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
}, {
    tableName: 'detalle_orden',
    timestamps: false
});

// INTERCONEXIÓN RELACIONAL COMPLETA
// Esto le dice a Sequelize cómo hacer JOINs automáticos cuando usemos ".findAll()"
Orden.hasMany(DetalleOrden, { foreignKey: 'orden_id', as: 'detalles' });
DetalleOrden.belongsTo(Producto, { foreignKey: 'producto_id', as: 'articulo' });

module.exports = DetalleOrden;
