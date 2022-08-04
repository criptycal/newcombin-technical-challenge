const Boletas = require('../models/boletas');
const PagarBoletas = require('../models/pagar-boletas');

const { validationResult } = require('express-validator');

exports.getIndex = (req, res, next) => {
    res.render('index', {
        pageTitle: 'Registrar Boleta',
        path: '/',
        errorMessage: '',
        validationErrors: ''
    })
}

//filtro servicio de telefono
exports.getServicioTelefono = (req, res, next) => {
    Boletas.find({servicio: 'Telefono'})
    .then(boletas => {
        res.render('listarboletas', {
            bolets: boletas,
            pageTitle: 'Listar Servicio Internet',
            path:'/listar-servicio-internet'
        })
    })
}

//filtro servicio internet
exports.getServicioInternet = (req, res, next) => {
    Boletas.find({servicio: 'Internet'})
    .then(boletas => {
        res.render('listarboletas', {
            bolets: boletas,
            pageTitle: 'Listar Servicio Internet',
            path:'/listar-servicio-internet'
        })
    })
}

//filtro servicio luz
exports.getListarServicioLuz = (req, res, next) => {
    Boletas.find({servicio: 'Luz'})
    .then(boletas => {
        res.render('listarboletas', {
            bolets: boletas,
            pageTitle: 'Listar Servicio Luz',
            path:'/listar-servicio-luz'
        })
    })
}

//filtro servicio gas
exports.getListarGas = (req, res, next) => {
    Boletas.find({servicio: 'Gas'})
    .then(boletas => {
        res.render('listarboletas', {
            bolets: boletas,
            pageTitle: 'Listar Servicio Gas',
            path:'/listar-servicio-gas'
        })
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
    //console.log(tipoServicio);
    const descripcionServicio = req.body.descripcion;
    const fechaVencimiento = req.body.fechavencimiento;
    const importeServicio = req.body.importeservicio;
    const estadoPago = req.body.estadopago;
    //console.log(estadoPago);
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

    if (estadoPago === 'Pago'){
            const pagarBoletas = new PagarBoletas({
                metodopago: 'Indefinido',
                importepago: 0,
                codigobarrapago: codigoBarra,
                fechapago: fechaVencimiento
            });
            pagarBoletas.save((err, doc) => {
                if(err){
                    console.log('error generado al momento de insertar un pago de boleta')
                    console.log(err)
                }
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







