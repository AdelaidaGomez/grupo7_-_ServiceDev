const express = require('express')

// Modulo nativo para manejar las rutas de los archivos html con sendFile
const path = require('path')

// Creamos el objeto literal que nos permite navegar dentro del home en diferentes items
let userController = {
      login: function(req, res) {
        //res.sendFile(path.resolve(__dirname, '../src/views/login.html'))
        res.render('login')
    },
    register: function(req, res) {
        //res.sendFile(path.resolve(__dirname, '../src/views/register.ejs'))
        res.render('register')
    },
       createRegister: function(req, res) {
        //res.send(req.body)
        // Traigo constante de servicios y transformo al JSON en un array
         const services = JSON.parse(fs.readFileSync(servicesFilePath, 'utf-8'));
         // Incluyo la info del formulario y creo el objeto literal a sumar al array
         const newService = {
             id: services[services.length - 1].id + 1,   // Tomo el ultimo servicio, agarro su id y le sumo 1.
             name: req.body.name,
             email: req.body-email,
             password: req.body.password,
             confirm_pass: req.body.confirm_pass,
             type_user: req.body.type_user,
           
         }
         services.push(newService); // Pusheo el objeto literal al array
         fs.writeFileSync(servicesFilePath, JSON.stringify(services, null, " ")); // Transformo a JSON y sobreescribo el JSON
         res.redirect("/"); // Mostramos al usuario la vista principal
         
    }
 }

// Exportamos 
module.exports = userController;
