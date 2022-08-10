//model
import Transaction from '../models/transaction';

/*
    @route   POST api/transactions
*/
export const postTransaction = async (req: any, res: any, next: any) => {
    try {
        const transaction = new Transaction(req.body);
        await transaction.save();
        return res.status(201).json({message: 'Transaccion guardada'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Error al guardar la transacción'});
    }
}
/*
    @route   GET api/transactions
*/
export const getTransactions = async (req: any, res: any, next: any) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        console.log(error);
    }
}
/*
    @route   GET api/transactions/:id
*/
export const getTransaction = async (req: any, res: any, next: any) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        return res.json(transaction);
    } catch (error) {
        console.log(error);
    }
}
/*
    @route   PUT api/transactions/:id
*/
export const putTransaction = async (req: any, res: any, next: any) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.json(transaction);
    } catch (error) {
        console.log(error);
    }
}
/*
    @route   DELETE api/transactions/:id
*/
export const deleteTransaction = async (req: any, res: any, next: any) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.id);
        return res.json(transaction);
    } catch (error) {
        console.log(error);
    }
}
/*
    @route   GET api/transactions/:paymentdate
*/
export const getTransactionByPaymentDate = async (req: any, res: any, next: any) => {
    try {
        const transaction = await Transaction.find({paymentDate: req.params.paymentdate});
        return res.json(transaction);
    } catch (error) {
        console.log(error);
    }
}
/*
    @route   GET api/transactions/paymentdates/:paymentdates
*/
export const getTransactionByPaymentDates = async (req: any, res: any, next: any) => {
    try {
        const transaction = await Transaction.find({paymentDate: {$gte: req.params.paymentdates, $lte: req.params.paymentdatess}});
        return res.json(transaction);
    } catch (error) {
        console.log(error);
    }
}