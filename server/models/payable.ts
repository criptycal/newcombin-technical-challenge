import mongoose from 'mongoose';

const payableSchema = new mongoose.Schema({
    tipoServicio: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    fechavencimiento: {
        type: Date,
        required: true
    },
    importeServicio:{
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        required: true
    },
    barcode: {
        type: String,
        required: true,
        unique: true
    }
},
{versionKey: false}
);

export default mongoose.model('Payables', payableSchema);
