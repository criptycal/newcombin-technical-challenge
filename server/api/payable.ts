 import {Router} from 'express';
const router = Router();
import { getPayables, postPayables, getPayableByBarcode, getPayableByTipoServicio } from '../controllers/payable'

/* GET payables */
router.get('/payables', getPayables)
/* GET payables/barcodes/:barcode */
      .get('/payables/barcodes/:barcode', getPayableByBarcode)
/* GET payables/services/:typeservice */
      .get('/payables/services/:typeservice', getPayableByTipoServicio)

/* POST payables */
      .post('/payables', postPayables);


export default router;