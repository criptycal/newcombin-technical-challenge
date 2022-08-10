import {Router} from 'express';
const router = Router();
import { postTransaction, getTransactions, getTransactionByPaymentDates, getTransactionByPaymentDate } from '../controllers/transaction';

/* POST transaction */
router.post('/transactions', postTransaction);
/* GET transactions */
router.get('/transactions', getTransactions);
/* GET transactions/paymentdate/:paymentdate */
router.get('/transactions/paymentdate/:paymentdate', getTransactionByPaymentDate);
/* GET transactions/paymentdate/:paymentdates */
router.get('/transactions/paymentdates/:paymentdates/:paymentdatess', getTransactionByPaymentDates);

export default router;