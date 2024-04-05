const fs = require('fs');
const path = require('path');
let db = require("../src/database/models");

// Trabajando con el archivo JSON 
const servicesFilePath = path.join(__dirname, '../src/data/servicesDataBase.json')

// Traemos express-validator para validaciones desde el backend
const {validationResult} = require("express-validator");

// Creamos el objeto literal que nos permite navegar dentro del home en diferentes items
let servicesController = {
    allProducts: function(req, res) {
        db.Services.findAll()
        .then(function(services) {
            console.log(services);
            res.render("services", {services: services})
        })
    },
    //allProducts: function(req, res) {
        //Utilizamos el archivo JSON Para mostrar los productos
    //    const services = JSON.parse(fs.readFileSync(servicesFilePath, 'utf-8'))
    //    res.render('services', {services: services});
    //},
    productCart: function(req, res) {
        const services = JSON.parse(fs.readFileSync(servicesFilePath, 'utf-8'))
        //Traemos la informacion del usuario desde el session cuando hacemos el processLogIn desde usercontroller       
            user: req.session.userLogged
            res.render("productCart", {services})
    },
    //detail: function(req, res) {
    //    const services = JSON.parse(fs.readFileSync(servicesFilePath, 'utf-8'))
        //encontramos el id del servicio
    //    const singleService = services.find(service => {
    //        return service.id == req.params.id
    //    })
    //    res.render('serviceDetail', {singleService: singleService})
    //},
    detail: function(req, res) {
        db.Services.findByPk(req.params.id)
        .then(function (services) {
            res.render("serviceDetail", {services: services});
        })
    },
    create: function(req, res) {
        db.Users.findAll()
        .then(function (users) {
            return res.render("service-create-form", {users: users});
        })
    },
    processCreate: function(req, res) {
        const { name, price, description, profession } = req.body;
        const userId = req.session.userLogged.id;
        console.log(userId);    
        db.Users.findByPk(userId)
        .then(user => {
            console.log("user: ")
            console.log(user);
            if (!user) {
                return res.status(404).send({ message: 'El usuario no existe' });
            }
            
            const resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0) {
                res.render("service-create-form", {
                    errorsObjeto: resultValidation.mapped(),
                    oldData: req.body
                })
            }
            else {
                // Crear el servicio
                db.Services.create({
                    name,
                    price,
                    description,
                    profession,
                    users_id: userId,
                    image: req.file.filename
                })
                .then(service => {
                    //res.status(201).send(service);
                    res.redirect("/services");
                })
                .catch(error => {
                    console.error("Error al crear el servicio:", error);
                    res.status(500).send({ message: 'Error al crear el servicio' });
                });
                }
            
        })
        .catch(error => {
            console.error("Error al buscar el usuario:", error);
            res.status(500).send({ message: 'Error al buscar el usuario' });
        });
    },
    edit: function(req, res) {
        let pedidoServices = db.Services.findByPk(req.params.id);
        let pedidoUsers = db.Users.findAll();
        Promise.all([pedidoServices, pedidoUsers])
            .then(function([services, users]) {
                res.render("service-edit-form", {services: services, users: users});
            })
    },
    /* processEdit: function(req, res) {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            res.render("service-edit-form", {
                errorsObjeto: resultValidation.mapped(),
                oldData: req.body
            });
        } else {
            // Actualiza los datos del servicio
            db.Services.update({
                name: req.body.name,
                description: req.body.description,
                profession: req.body.profession,
                price: req.body.price
            }, {
                // Especifica qué servicio editar utilizando la ID proporcionada en la URL
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                // Redirecciona a la página de servicios después de la actualización exitosa
                res.redirect("/services");
            })
            .catch(error => {
                // Maneja cualquier error que pueda ocurrir durante la actualización
                console.error("Error al actualizar el servicio:", error);
                res.redirect("/services"); // Redirige a la página de servicios en caso de error
            });
        }
    }, */

    processEdit: async (req, res) => {
        try {
            const servicio = await db.Services.findByPk(req.params.id);
            const service = await db.Services.update({
                name: req.body.name,
                description: req.body.description,
                image: req.file ? req.file.filename : servicio.image,
                profession: req.body.profession ? req.body.profession : servicio.profession,
                profession: req.body.profession,
                price: req.body.price
            }, {
                // Solo editamos el servicio del ID que aparece en la URL
                where: {
                    id: req.params.id
                }
            });
            // Redireccionamos a la pagina de servicios
            //res.redirect("/services");
            res.redirect("/services");
        }
        catch (error) {
            console.error("error al editar un servicio", error);
            res.redirect("/services");
        }
    },

    destroy: function(req, res) {
        db.Services.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect("/services")
    }

    



    
    
};
  
  // Exportamos 
  module.exports = servicesController;