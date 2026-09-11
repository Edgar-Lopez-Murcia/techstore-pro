// Importar Mongoose para usar Schema y model
const mongoose = require('mongoose');

// Comentarios y calificaciones de Procuto
const comentarioSchema = new mongoose.Schema({
    usuario:         {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', require: true}, // ID del usuario que comenta
    comentario:      {type: String, require: true}, // texto del comentario
    calificacion:    {type: Number, require: true, min: 1, max: 5}, // número de 1 a 5
    fecha:           {type: Date, default: Date.now} // fecha de creación del comentario
});

// Sxhema: define los camposde documento en Atlas
const productoSchema = new mongoose.Schema({
    id:              {type: Number, require: true}, // número: 1,2,,3
    icono:           {type: String, require: true}, // emoji de producto
    nombre:          {type: String, require: true}, // nombre de producto
    descripcion:     {type: String, require: true}, // texto descriptivo
    precio:          {type: String, require: true}, // "8.999.000" - texto, no número
    imagen:          {type: String, require: true}, // ruta de la imagen
    comentarios:     [comentarioSchema] // array de comentarios
})

// Crea el Model - Mongoose busca la coleccion 'productos' en Atlas
const producto = mongoose.model('producto', productoSchema);

// Exportar para poder usarlo en server.js
module.exports = producto;