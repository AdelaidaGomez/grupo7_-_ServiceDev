const express = require('express')

// Modulo nativo para manejar las rutas de los archivos html con sendFile
const path = require('path')

// Creamos el objeto literal que nos permite navegar dentro del home en diferentes items
let mainController = {
    mainPage: function(req, res) {
        //res.sendFile(path.resolve(__dirname, '../src/views/index.html'))
        res.render('index')
    },
    /*login: function(req, res) {
        //res.sendFile(path.resolve(__dirname, '../src/views/login.html'))
        res.render('login')
    },
    register: function(req, res) {
        //res.sendFile(path.resolve(__dirname, '../src/views/register.ejs'))
        res.render('register')
    }
    */
    
}

// Exportamos 
module.exports = mainController;