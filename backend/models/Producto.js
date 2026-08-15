// Importar Mongoose para usar Schema y model
const mongoose = require('mongoose');

// Sxhema: define los camposde documento en Atlas
const productoSchema = new mongoose.Schema({
    id:              {type: Number, require: true}, // número: 1,2,,3
    icono:           {type: String, require: true}, // emoji de producto
    nombre:          {type: String, require: true}, // nombre de producto
    descripcion:     {type: String, require: true}, // texto descriptivo
    precio:          {type: String, require: true}, // "8.999.000" - texto, no número
    imagen:          {type: String, require: true}, // ruta de la imagen

})

// Crea el Model - Mongoose busca la coleccion 'productos' en Atlas
const producto = mongoose.model('producto', productoSchema);

// Exportar para poder usarlo en server.js
module.exports = producto;