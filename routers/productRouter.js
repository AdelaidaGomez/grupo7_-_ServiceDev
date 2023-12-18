const express = require('express')
// Requerimos el router desde express
const router = express.Router()

// Requerimos el objeto literal para products desde controllers
const productController = require('../controller/productController.js')

router.get('/productDetail', productController.productDetail)
router.get('/productCart', productController.productCart)

// Exportamos Router
module.exports = router