const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const MONGODB_URI = `mongodb+srv://criptycal:NewCombinPass@sandbox.c52iz.mongodb.net/?retryWrites=true&w=majority`

app.set('view engine', 'ejs');
app.set('views', 'views');

const homeRoutes = require('./routes/home')
const pagoBoletas = require('./routes/pagar-boletas')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(homeRoutes);
app.use(pagoBoletas);

mongoose
    .connect(MONGODB_URI)
    .then(result => {
        app.listen(port);
        console.log(`connected to database and listening at port ${port}`)
    })
    .catch(err =>{
        console.log(err);
    })

