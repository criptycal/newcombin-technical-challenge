const Boletas = require('../models/boletas');

const { validationResult } = require('express-validator');

exports.getIndex = (req, res, next) => {
    res.render('index', {
        pageTitle: 'Registrar Boleta',
        path: '/',
        errorMessage: '',
        validationErrors: ''
    })
}

//sin filtro
exports.getListarBoletas = (req, res, next) => {

    Boletas.find()
        .then(boletas => {
            //console.log(boletas);
            res.render('listarboletas', {
                bolets: boletas,
                pageTitle: 'Listar Boletas',
                path: '/listarboletas'
            })
        })
        .catch(err => {
            if(err){
                console.log(err)
            }
        })
    
}


exports.postBoletas = (req, res, next) => {
    
    const tipoServicio = req.body.servicio;
    console.log(tipoServicio);
    const descripcionServicio = req.body.descripcion;
    const fechaVencimiento = req.body.fechavencimiento;
    const importeServicio = req.body.importeservicio;
    const estadoPago = req.body.estadopago;
    console.log(estadoPago);
    const codigoBarra = req.body.codigobarra;
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).render('index', {
            path: '/',
            pageTitle: 'NewCombin Challenge',
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
        })
    }

    const boletas = new Boletas({
        servicio: tipoServicio,
        descripcion: descripcionServicio,
        fechavencimiento: fechaVencimiento,
        importeservicio: importeServicio,
        estadopago: estadoPago,
        codigobarra: codigoBarra
    })



    return boletas.save((err, doc) => {
        if(err){
            console.log(err)
        }
        if(!err){
            res.redirect('/listar-boletas')
        }
    });
}







