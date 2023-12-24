const express = require('express')
// Requerimos el router desde express
const router = express.Router()

// Requerimos el objeto literal para products desde controllers
const servicesController = require('../controller/servicesController.js');

router.get('/', servicesController.allProducts); // todos los servicios, recordar que como es otro archivo se inicia con / ya ue definimos en app que tiene /services 
router.get('/productCart', servicesController.productCart); //Recordar que para entrar a este la ruta debe ser: Servidor/services/productCart

router.get('/serviceDetail/:id', servicesController.detail)

// Ruteo de formulario create
router.get("/create", servicesController.create) // Para devolverle al usuario el formulario para crear servicio
router.post("/create", servicesController.processCreate) // Para agregar el servicio creado

// Ruteo de formulario edit
router.get("/edit/:id", servicesController.edit) // Para devolverle al usuario el formulario para editar servicio
router.put("/edit/:id", servicesController.processEdit) // Para actualizar el producto editado

// Exportamos Router
module.exports = router;
