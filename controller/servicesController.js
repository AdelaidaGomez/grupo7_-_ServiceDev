const fs = require('fs');
const path = require('path');
let db = require("../src/database/models");

// Trabajando con el archivo JSON 
const servicesFilePath = path.join(__dirname, '../src/data/servicesDataBase.json')

// Creamos el objeto literal que nos permite navegar dentro del home en diferentes items
let servicesController = {
    allProducts: function(req, res) {
        db.Services.findAll()
        .then(function(services) {
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
            
        db.Users.findByPk(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: 'El usuario no existe' });
            }
    
            // Crear el servicio
            db.Services.create({
                name,
                price,
                description,
                profession,
                users_id
            })
            .then(service => {
                res.status(201).send(service);
            })
            .catch(error => {
                console.error("Error al crear el servicio:", error);
                res.status(500).send({ message: 'Error al crear el servicio' });
            });
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
    processEdit: function(req, res) {
        db.Services.update({
            name: req.body.name,
            description: req.body.description,
            image: req.file.filename,
            // category: req.body.category
            especialidad: req.body.especialidad,
            price: req.body.price
        }, {
            // Solo editamos el servicio del ID que aparece en la URL
            where: {
                id: req.params.id
            }
        });
        // Redireccionamos a la pagina de servicios
        res.redirect("/services");
    },
    destroy: function(req, res) {
        db.Services.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect("/services")
    }

    



    
    /* create: function(req, res) {
        res.render("service-create-form");
    }, */
    //processCreate: function(req, res) {
        // Traigo constante de servicios y transformo al JSON en un array
    //    const services = JSON.parse(fs.readFileSync(servicesFilePath, 'utf-8'));
        // Incluyo la info del formulario y creo el objeto literal a sumar al array
    //    console.log(req.body);
    //    const newService = {
    //        id: services[services.length - 1].id + 1,   // Tomo el ultimo servicio, agarro su id y le sumo 1.
    //        name: req.body.name,
    //        description: req.body.description,
    //        image: req.file.filename,
            /* category: req.body.category, */
    //        especialidad: req.body.especialidad,
    //        price: req.body.price
    //    }
    //    services.push(newService); // Pusheo el objeto literal al array
    //    fs.writeFileSync(servicesFilePath, JSON.stringify(services, null, " ")); // Transformo a JSON y sobreescribo el JSON
    //    res.redirect("/services"); // Mostramos al usuario la vista principal
    //},
    //edit: function (req, res) {
        // Traigo constante de servicios y transformo al JSON en un array
    //    const services = JSON.parse(fs.readFileSync(servicesFilePath, "utf-8"));
        // Busco el producto con el mismo id
    //    const serviceToEdit = services.find(service => {
    //        return service.id == req.params.id;         
//});
        // Muestro la vista del formulario utilizando como parametro el objeto literal serviceToEdit
    //    res.render("service-edit-form", {serviceToEdit});
//},
    //processEdit: function(req, res) {
    //    const services = JSON.parse(fs.readFileSync(servicesFilePath, "utf-8"));
        // Busco el servicio que debe ser editado
    //    const id = req.params.id;
    //    let serviceToEdit = services.find(service => service.id == id);
        // Creo el producto "nuevo" que va a reemplazar al anterior
    //    serviceToEdit = {
    //        id: serviceToEdit.id,
    //        name: req.body.name,
    //        description: req.body.description,
    //        image: req.file != undefined ? req.file.filename : serviceToEdit.image,
            /* category: req.body.category, */
    //        especialidad: req.body.especialidad,
    //        price: req.body.price,
    //    }
        // Buscamos la posicion del producto a editar
    //    let indice = services.findIndex(service => {
    //        return service.id == id;
    //    });
        // Reemplazamos
    //    services[indice] = serviceToEdit;
        // Sobreescribo el JSON
    //    fs.writeFileSync(servicesFilePath, JSON.stringify(services, null, " "));
        // Redirecciono a la pagina de productos
    //    res.redirect("/services");

    //},
    //destroy: (req, res) => {
    //    let services = JSON.parse(fs.readFileSync(servicesFilePath, 'utf-8'));

        //eliminar
    //    services = services.filter(service => {
            //Creamos un array nuevo menos en el que estamos parados
    //        return service.id != req.params.id
    //    })
    //    fs.writeFileSync(servicesFilePath, JSON.stringify(services, null, " "));
        //Hacemos el redirect
    //    res.redirect('/services')
    //}
};
  
  // Exportamos 
  module.exports = servicesController;