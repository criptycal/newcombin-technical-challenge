const express = require('express');
const router = express.Router();
const pagarBoletasController = require('../controllers/pagar-boletas');
const Boletas = require('../models/payables');
const {check, body} = require('express-validator');

router.get('/pagar-boleta', pagarBoletasController.getPagos);
router.get('/listar-pagos', pagarBoletasController.getListarPagos);
router.post('/filtrarFechasPagos', pagarBoletasController.postFiltrarFechas);

router.post('/registrarpagoboleto',[
    check('codigobarrapago').isLength({min: 13}).withMessage('El C0DIGO de barras debe contener al menos 13 CAR4CTERES')
    .isLength({max: 13}).withMessage('El C0DIGO de barras debe contener M4XIMO 13 CAR4CTERES')
    .custom(
        async(value, {req}) => {
            codigoDoc = await Boletas.findOne({codigobarra: value, estadopago: 'Pago'});
            codigoNoEncontrado = await Boletas.findOne({codigobarra: value});
            //console.log(codigoDoc)
            if(codigoDoc){
                return Promise.reject('ERROR - El C0digo de barras YA encuentra en estado PAGO')
            }else if(!codigoNoEncontrado){
                return Promise.reject('ERROR - El C0digo de barras NO se encuentra registrado en el sistema')
            }
        }
    ),
    
], pagarBoletasController.postPagarBoletas);


module.exports = router;