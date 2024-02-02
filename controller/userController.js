const express = require('express')
const fs = require('fs');

const path = require('path') // Modulo nativo para manejar las rutas de los archivos html con sendFile
const User = require('../models/User') //requerimos el archivo User con todas las funcionalidades crud para utilizar cada metodo
const bcrypt = require('bcryptjs'); // Requerir el modulo de encriptamiento para password

// Trabajando con el archivo JSON 
// const userFilePath = path.join(__dirname, '../src/data/userDataBase.json')

// Requerimos el atributo "validation result" del modulo "express validator" para validaciones login
const {validationResult} = require("express-validator");
const { log } = require('console');

// Creamos el objeto literal que nos permite navegar dentro del home en diferentes items
let userController = {
    login: function(req, res) {
        //res.sendFile(path.resolve(__dirname, '../src/views/login.html'))
        res.render("login");
    },
    processLogin: function(req, res) {
        let errors = validationResult(req);
        if (errors.isEmpty()) {     // Si tenemos errores, entonces convertimos el resultado a un objeto literal y se lo pasamos a la vista (formulario + mensaje del error)
            res.render("login", {old: req.body});
        }
        else {
            res.render("login", {
                errors: errors.mapped(),
                old: req.body // Lo que escribió el usuario en el body
            })
        }













        // Traemos usuarios del JSON
        
        // Validacion contraseña encriptada

        // Paso 1 antes del middleware (ruta huespedes y usuarios)

        // if (errors.isEmpty()) {
        //     let usersJSON = fs.readFileSync("userDataBase.json", {encoding: "utf-8"})
        //     let users;
        //     if (usersJSON == "") {
        //         users = [];
        //     } else {
        //         users = JSON.parse(usersJSON);
        //     } 
        //     console.log(users);
            
        //     for (let i=0; i < userDataBase.length; i++) {
        //         if (users[i].email == req.body.email) {
        //             if (bcrypt.compareSync(req.body.password, usuarioALoguearse)) {
        //                 let usuarioALoguearse = users[i];
        //                 break;
        //             }
        //         }
        //     }

        //     if (usuarioALoguearse == undefined) {
        //         return res.render("login", {errors: [{msg: "credenciales incorrectas"}]})
        //     }
        //     req.session.usuarioLogueado = usuarioALoguearse;
        //     res.render("index");
        // } else {
        //     return res.render("login", {errors: errors});
        // }
    },
    register: function(req, res) {
        //res.sendFile(path.resolve(__dirname, '../src/views/register.ejs'))
        res.render('register')
    },
       createRegister: function(req, res) {
        //Proceso de validacion FALTA

        console.log(req.body, req.file);

        //Creamos nuevo usuario
        let userToCreate = {
            ...req.body,  //Requerimos todo lo del body
            password: bcrypt.hashSync(req.body.password, 10), //Incriptmos la contrasena 
            confirm_pass: bcrypt.hashSync(req.body.password, 10), //Incriptmos la contrasena 
            foto_usuario: req.file.fileName //Para foto de perfil
        }

        User.create(userToCreate)

        res.send("OK se guardo el usuario")



        //Traemos constante del register y lo convertimos en un array
        // const users =JSON.parse(fs.readFileSync(userFilePath, 'utf-8'))
        // //Traemos la informacion del formulario y creamos objeto literal a sumar al array
        // const newUser = {
        //     id: users[users.length - 1].id + 1,   // Tomo el ultimo usuario, consulto su id y le sumo 1.
        //     name: req.body.name,
        //     email: req.body.email,
        //     password: bcrypt.hashSync(req.body.password, 10), 
        //     confirm_pass: bcrypt.hashSync(req.body.confirm_pass, 10),
        //     foto_usuario: req.file.filename,
        //     type_user: req.body.type_user,
        // }
        // //Pusheamos el objeto literal al array
        // users.push(newUser)
        // //Transformamos a JSON
        // fs.writeFileSync(userFilePath, JSON.stringify(users, null, " "))
        // //Redirect al usuario
        // res.redirect("/services")
        
    }
 }
// Exportamos 
module.exports = userController;
