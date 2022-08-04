const mongoose = require('mongoose');

const PagarBoletasSchema = new mongoose.Schema({
    metodopago: {
        type: String,
        required: true
    },
    numerotarjeta: {
        type: Number,
    },
    importepago: {
        type: Number,
        required: true
    },
    codigobarrapago: {
        type: Number,
        required: true,
        unique: true
    },
    fechapago: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('PagarBoletas', PagarBoletasSchema);