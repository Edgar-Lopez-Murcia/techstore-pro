const mongoose = require('mongoose');
const { Schema } = mongoose;

const ordenSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    productos: [{
        producto: {
            type: Schema.Types.ObjectId,
            ref: 'producto'
        },
        cantidad: { type: Number, required: true, min: 1}
    }],

    // Total calculado en el frontend (o en una ruta)
    total: { type: Number, required: true},

    // Estado del ciclo de vide de la orden
    estado: {
        type: String,
        default: 'pendiente',
        enum: ['pendiente', 'procesando', 'enviado', 'entregado', 'PAG0_COFIRMADO']
    },

    // Datos de wompi - se llenan solo cuando el pago fue aprobado
    wompiTrasactionId: {type: String},
    wompiReference : { type: String}


}, { timestamps: true}); // agrega createdAt y updedAt

const Orden = mongoose.model('Orden', ordenSchema);

module.exports= Orden;