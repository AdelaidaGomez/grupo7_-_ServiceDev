const express = require('express')
// Requerimos el router desde express
const router = express.Router()

// Requerimos el objeto literal desde controllers
const mainController = require('../controller/mainController.js');

router.get('/', mainController.mainPage);
router.get('/register', mainController.register)
router.get('/login', mainController.login)
router.get('/productDetail', mainController.productDetail)
router.get('/productCart', mainController.productCart)



// Exportamos Router
module.exports = router;