const express = require('express')
const fs = require('fs');

const path = require('path') // Modulo nativo para manejar las rutas de los archivos html con sendFile
const User = require('../models/User') //requerimos el archivo User con todas las funcionalidades crud para utilizar cada metodo
let db = require("../src/database/models")
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
        //Buscamos al usuario que se quiere loguear y lo guardamos en la variable userToLogin
        let userToLogin = User.findByField('email', req.body.email)
        
        let errors = validationResult(req);
        // Si no hay errores en los campos de login, entonces pasamos a la validacion
        if(errors.isEmpty()) {            
            //Hacemos la validacion para ver si el usuario que se quiere loguear ya esta registrado
            if (userToLogin) {
                //como el password esta haseado debemos compararlo con compareSync
                let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.password)
                //Si encontramos al usaurio verificamos la contrasena sea correcta
                if (isOkThePassword) {
                    //Borramos la propiedad password para no mantener en sesion su password
                    delete userToLogin.password
                    //Guardamos al usuario en session
                    req.session.userLogged = userToLogin

                    return res.redirect('/productCart')
                }
                //Si no es a contrasena correcta
                return res.render("login", {
                    errors: {
                        email: {
                            msg: "Contraseña Incorrecta"
                        }
                    }
                })
            }
            //Si no tenemos al usuario registrado mandamos al usuario a la misma vista pero con los errores
            return res.render("login", {
                errors: {
                    email: {
                        msg: "Este email no esta registrado"
                    }
                }
            });
        } 
        // Si hay errores en los campos del login, entonces renderizamos la vista de login mostrando el/los mensaje/s de error/es
        else {
            res.render("login", {
                errors: errors.mapped(),
                old: req.body // Lo que escribió el usuario en el body
            })
        }
    },

    register: function(req, res) {
        //res.sendFile(path.resolve(__dirname, '../src/views/register.ejs'))
        res.render('register')
    },

    createRegister: function(req, res) {
        db.Users.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
            type_users_id: req.body.type_user, //Confirmar como es esta relacion
        })

        return res.redirect('/login')






        //Buscar si el usuario ya esta registrado para no volverlo a registrar con el metodo findByfield comparando el email de la BD con el email que nos llego del body
        // let userInDB = User.findByField('email', req.body.email);               
        // let errors = validationResult(req);
        // // Si no hay errores en los campos de register, entonces pasamos a la validacion
        // if(errors.isEmpty()) {            
        // //Hacemos la validacion diciendo que si el usuario ya esta registrado, retornamos un error        
        //     if (userInDB) {
        //         //Enviamos el error
        //         return res.render('register', {
        //             errors: {
        //                 email: {
        //                 msg: "Este email ya esta registrado"
        //                 }
        //             },
        //             //Recuperar los datos que estaban bien en el registro
        //             oldData: req.body
        //         })
        //     }

        //     //Si no esta registrado Creamos nuevo usuario
        //     let userToCreate = {
        //         ...req.body,  //Requerimos todo lo del body
        //         password: bcrypt.hashSync(req.body.password, 10), //Incriptmos la contrasena 
        //         confirm_pass: bcrypt.hashSync(req.body.password, 10), //Incriptmos la contrasena 
        //         avatar: req.file.filename //Para foto de perfil
        //     }
        //     //Guardamos al usuario que creamos en la variable para usarla despues
        //     let userCreated = User.create(userToCreate)

        //     return res.redirect('/login')
        // }
        // else {
        //     res.render("register", {
        //         errors: errors.mapped(),
        //         oldData: req.body // Lo que escribió el usuario en el body
        //     })
        // }
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
