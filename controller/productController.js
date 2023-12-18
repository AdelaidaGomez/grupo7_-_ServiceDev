const express = require('express')

// Modulo nativo para manejar las rutas de los archivos html con sendFile
const path = require('path')

// Creamos el objeto literal que nos permite navegar dentro del home en diferentes items
let productController = {
  
    productDetail: function(req, res) {
        res.render('productDetail.ejs')
    },
    productCart: function(req, res) {
        res.render('productCart.ejs')
    },
}

// Exportamos 
module.exports = productController