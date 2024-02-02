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
const session = require('express-session');

// Creamos el objeto literal que nos permite navegar dentro del home en diferentes items
let userController = {

    login: function(req, res) {
        res.render("login");
    },

    processLogin: function(req, res) {
        // if (errors.isEmpty()) {     // Si tenemos errores, entonces convertimos el resultado a un objeto literal y se lo pasamos a la vista (formulario + mensaje del error)
        //     res.render("login", {old: req.body});
        // }
        // else {
        //     res.render("login", {
        //         errors: errors.mapped(),
        //         old: req.body // Lo que escribió el usuario en el body
        //     })
        // }
        
        //Buscamos al usuario que se quiere loguear
        let userToLogin = User.findByField('email', req.body.email)
        //Hacemos una validacion para ver si el usuario que se quiere loguear ya esta registrado
        if (userToLogin) {
            //como el password esta haseado debemos compararlo con compareSync
            let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.password)
            //Si encontramos al usaurio verificamos la contrasena sea correcta
            if (isOkThePassword) {
                //Borramos la propiedad password para no mantener en sesion su password
                delete userToLogin.password
                //Guardamos al usuario en session FALTA
                req.session.userLogged = userToLogin

                return res.redirect('/productCart')
            }
            //Si no es a contrasena correcta
            return res.render("login", {
                errors: {
                    email: {
                        msg: "Las credenciales son incorrectas"
                    }
                }
            })
        }
        //Si no tenemos al usuario registrado mandamos al usuario a la misma vista pero con los errores
        return res.render("login", {
            errors: {
                email: {
                    msg: "No se encuentra este emai en nuestra BD"
                }
            }
        });
    },

    register: function(req, res) {
        //res.sendFile(path.resolve(__dirname, '../src/views/register.ejs'))
        res.render('register')
    },

    createRegister: function(req, res) {
        //Proceso de validacion FALTA

        //Buscar si el usuario ya esta registrado para no volverlo a registrar con el metodo findByfield comparando el email de la BD con el email que nos llego del body
        let userInDB = User.findByField('email', req.body.email);

        //Hacemos una validacion diciendo que si el usuario ya esta en el registro retornamos un error
        if (userInDB) {
            //Enviamos el error FALTA esto es un template
            return res.render('register', {
                errors: {
                    email: {
                       msg: "Este email ya esta registrado"
                    }
                },
                oldData: req.body
            })
        }

        //Si no esta registrado Creamos nuevo usuario
        let userToCreate = {
            ...req.body,  //Requerimos todo lo del body
            password: bcrypt.hashSync(req.body.password, 10), //Incriptmos la contrasena 
            confirm_pass: bcrypt.hashSync(req.body.password, 10), //Incriptmos la contrasena 
            foto_usuario: req.file.fileName //Para foto de perfil
        }
        //Guardamos al usuario que creamos en la variable para usarla despues
        let userCreated = User.create(userToCreate)

        return res.redirect('/login')
    },

    logOut: (req, res) => {
        //Borramos todo lo que esta en sesion
        req.session.destroy()
        //Redireccionamos a la home
        return res.redirect('/')
    }
 }
// Exportamos 
module.exports = userController;
