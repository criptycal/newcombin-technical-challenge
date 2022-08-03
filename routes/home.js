const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');

const {check, body} = require('express-validator');
const Boletas = require('../models/boletas');



router.get('/', homeController.getIndex);

router.post('/registrarboleta', [
    check('codigobarra').isLength({min: 13}).withMessage('El C0DIGO de barras debe contener al menos 13 CAR-CTERES')
    .isLength({max: 13}).withMessage('El C-DIGO de barras debe contener MAXIMO 13 CAR-CTERES')
    .custom(
        async(value, {req}) =>{
            codigoDoc = await Boletas.findOne({ codigobarra: value });
            if(codigoDoc){
                return Promise.reject('Este C-DIGO ya se encuentra REGISTRADO');
            }
           
        }
    )
], homeController.postBoletas);







module.exports = router;