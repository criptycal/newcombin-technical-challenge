const mongoose = require('mongoose');

const BoletasSchema = new mongoose.Schema({
    servicio: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true
    },
    fechavencimiento: {
        type: Date,
        required: true
    },
    importeservicio: {
        type: Number,
        required: true
    },
    estadopago: {
        type: String,
        required: true
    },
    codigobarra: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Boletas', BoletasSchema);