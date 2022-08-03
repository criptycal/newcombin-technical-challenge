const express = require('express');
const router = express.Router();
const pagarBoletasController = require('../controllers/pagar-boletas');
const Boletas = require('../models/boletas');
const {check, body} = require('express-validator');

router.get('/pagar-boleta', pagarBoletasController.getPagos);
router.post('/registrarpagoboleto',[
    check('codigobarrapago').isLength({min: 13}).withMessage('El C0DIGO de barras debe contener al menos 13 CAR-CTERES')
    .isLength({max: 13}).withMessage('El C0DIGO de barras debe contener M4XIMO 13 CAR4CTERES')
    .custom(
        async(value, {req}) => {
            codigoDoc = await Boletas.findOne({codigobarra: value});
            console.log(codigoDoc)
            if(!codigoDoc){
                return Promise.reject('Pago no se pudo realizar debido a que este C0digo NO SE ENCUENTRA REGISTRADO EN EL SISTEMA')
            }
        }
    )
], pagarBoletasController.postPagarBoletas);

module.exports = router;