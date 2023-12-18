const express = require('express')
// Requerimos el router desde express
const router = express.Router()

// Requerimos el objeto literal para products desde controllers
const servicesController = require('../controller/servicesController.js');

router.get('/', servicesController.allProducts); // todos los servicios, recordar que como es otro archivo se inicia con / ya ue definimos en app que tiene /services 
router.get('/productCart', servicesController.productCart); //Recordar que para entrar a este la ruta debe ser: Servido/services/productCart

router.get('/serviceDetail/:id/', servicesController.detail)

// Exportamos Router
module.exports = router;
