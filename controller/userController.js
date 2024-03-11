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
const { name } = require('ejs');

// Creamos el objeto literal que nos permite navegar dentro del home en diferentes items
let userController = {

    login: function(req, res) {
        res.render("login");
    },

    processLogin: function(req, res) {
        //Buscamos al usuario que se quiere loguear y lo guardamos en la variable userToLogin
        //let userToLogin = db.Users.findByField('email', req.body.email)
        //let userToLogin = db.Users.findOne({ where: { email: req.body.email } }); //otra opcion para solucionar error findByField
        //let userToLogin = db.Users.findBy({ 'email', mail: req.body.email }); //otra opcion para solucionar error findByField
        let userToLogin = db.Users.findOne({ 
            where: { 
                email: req.body.email 
            } 
        }
        )

        
        let errors = validationResult(req);
        // Si no hay errores en los campos de login, entonces pasamos a la validacion
        if(errors.isEmpty()) {            
            //Hacemos la validacion para ver si el usuario que se quiere loguear ya esta registrado
            if (userToLogin) {
                //como el password esta haseado debemos compararlo con compareSync
                let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.password)
                //let isOkThePassword = req.body.password == userToLogin.password
                //Si encontramos al usaurio verificamos la contrasena sea correcta
                if (isOkThePassword) {
                    //Borramos la propiedad password para no mantener en sesion su password
                    delete userToLogin.password
                    //Guardamos al usuario en session
                    req.session.userLogged = userToLogin

                    // Defino qué ocurre cuando clickeo opcion "recordar usuario" y que ocurre cuando la destildo
                    if(req.body.remember_user){
                        res.cookie("userEmail", req.body.email, {maxAge: (1000 * 60) * 10}) // La cookie durará 10 minutos
                    }

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
        //CODIGO CON BD
        let errors = validationResult(req)
        //Buscar si el usuario ya esta registrado para no volverlo a registrar a partir del emai
        db.Users.findOne({where: {email: req.body.email }})
            .then((usuarioInDB) => {
                // Validando si no hay errores en el proceso de register (Como email vacio)
                if(errors.isEmpty()){
                    //Hacemos otra validacion diciendo que si el usuario ya esta registrado, retornamos un error 
                    if(usuarioInDB) {
                        //Enviamos error
                        return res.render('register', {
                            errors: {
                                email: {
                                    msg: "Este Email ya esta registrado"
                                }
                            },
                            //Recuperar los datos que estaban bien en el registro
                            oldData: req.body
                        })
                    }
                    
        //             //Si no esta registrado creamos un nuevo usuario
                    db.Users.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, 10),
                        //password: (req.body.password, 10),
                        avatar: req.file.filename,
                        type_users_id: req.body.type_user, //Confirmar como es esta relacion
                    })

                    return res.redirect('/login')

                } else {
                    res.render("register", {
                        errors: errors.mapped(),
                        oldData: req.body // Lo que escribió el usuario en el body
                    })
                }

            })

        //CODIGO CON JSON
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
        // Borramos la cookie userEmail
        res.clearCookie("userEmail");
        //Borramos todo lo que esta en sesion
        req.session.destroy()
        //Redireccionamos a la home
        return res.redirect('/')
    }
 }
// Exportamos 
module.exports = userController;
