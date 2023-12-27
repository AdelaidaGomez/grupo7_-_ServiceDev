// Exportamos Router

const express = require('express')
// Requerimos el router desde express
const router = express.Router()

// Requerimos el objeto literal para products desde controllers
const userController = require('../controller/userController.js');

router.get('/login', userController.login); // todos los servicios, recordar que como es otro archivo se inicia con / ya ue definimos en app que tiene /services 
router.get('/register', userController.register); //Recordar que para entrar a este la ruta debe ser: Servido/services/productCart
router.post('/register', userController.createRegister); //se establece el metodo post para enviar los datos registrados en el formulario
// Ruteo de formulario create

// Exportamos Router
module.exports = router;
