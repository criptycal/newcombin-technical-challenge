const PagarBoletas = require('../models/transactions');
const Boletas = require('../models/payables');

const { validationResult } = require('express-validator');


exports.getListarPagos = (req, res, next) =>{
    
    PagarBoletas.find()
        .then(pagos => {
            //console.log(pagos);
            res.render('listarpagos', {
                pags: pagos,
                pageTitle: 'Listar Pagos',
                path: '/listarpagos'
            })
        })
        .catch(err => {
            if(err){
                console.log(err)
            }
        })


        
}



exports.getPagos = (req, res, next) => {
    res.render('pagarboleta', {
        pageTitle: 'Pagar Boleta',
        path: '/pagar-boleta',
        errorMessage: '',
        validationErrors: ''
    })
}

exports.postFiltrarFechas = (req, res, next) =>{
    const dataDate = req.body.dateFlat;
    console.log(dataDate);
}

exports.postPagarBoletas = (req, res, next) => {
    const metodoPago = req.body.metodopago;
    const numeroTarjeta = req.body.creditdebitcardnumber;
    const importePago = req.body.importepago;
    const codigoBarraPago = req.body.codigobarrapago;// --->2 horas solucionando un error que no encontraba y estaba aqui, estaba mal escrito el parametro...
    const fechaPago = req.body.fechapago;

    const errors = validationResult(req);


    if(!errors.isEmpty()){//<--- 1 hora solucionando un error y estaba aqui, faltaba parentesis()...
        return res.status(422).render('pagarboleta', {
            path: '/pagar-boleta',
            pageTitle: 'Error Pago',
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
        });

    }

    Boletas.findOneAndUpdate({codigobarra: codigoBarraPago}, {estadopago: 'Pago'}, (err, data) => {
        if(err){
            console.log(err)
        }else{
            console.log(data)
        }
    })

    const pagarBoletas = new PagarBoletas({
        metodopago: metodoPago,
        numerotarjeta: numeroTarjeta,
        importepago: importePago,
        codigobarrapago: codigoBarraPago,
        fechapago: fechaPago
    });
 
    
    return pagarBoletas.save((err, doc) => {
        if(err){
            console.log(err)
        }
        if(!err){
            res.redirect('/listar-pagos')
        }
    })

}