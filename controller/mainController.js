const express = require('express')

// Modulo nativo para manejar las rutas de los archivos html con sendFile
const path = require('path')

// Creamos el objeto literal que nos permite navegar dentro del home en diferentes items
let mainPageController = {
    mainPage: function(req, res) {
        res.sendFile(path.resolve(__dirname, '../src/views/index.html'))
    },
    login: function(req, res) {
        res.sendFile(path.resolve(__dirname, '../src/views/login.html'))
    },
    register: function(req, res) {
        res.sendFile(path.resolve(__dirname, '../src/views/register.html'))
    },
    productDetail: function(req, res) {
        res.sendFile(path.resolve(__dirname, '../src/views/productDetail.html'))
    },
    productCart: function(req, res) {
        res.sendFile(path.resolve(__dirname, '../src/views/productCart.html'))
    },
}

// Exportamos 
module.exports = mainPageController