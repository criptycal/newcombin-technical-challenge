import mongoose from 'mongoose';
import Payable from './Payable';

const transactionSchema = new mongoose.Schema({
    paymentMethod: {
        type: String,
        required: true
    },
    cardNumber: {
        type: Number,
    },
    paymentAmount: {
        type: Number,
        required: true
    },
    barcode: {
        type: String,
        required: true,
        unique: true
    },
    paymentDate: {
        type: Date,
        required: true
    }
}, {versionKey: false});

export default mongoose.model('Transactions', transactionSchema);