const fs = require('fs')
const path = require('path')

// Trabajando con el archivo JSON 
const servicesFilePath = path.join(__dirname, '../src/data/servicesDataBase.json')

// Creamos el objeto literal que nos permite navegar dentro del home en diferentes items
let servicesController = {
    allProducts: function(req, res) {
        //Utilizamos el archivo JSON Para mostrar los productos
        const services = JSON.parse(fs.readFileSync(servicesFilePath, 'utf-8'))
        res.render('services', {services: services});
    },
    productCart: function(req, res) {
      res.render('productCart');
    },
    detail: function(req, res) {
        const services = JSON.parse(fs.readFileSync(servicesFilePath, 'utf-8'))
        //encontramos el id del servicio
        const singleService = services.find(service => {
            return service.id == req.params.id
        })
        res.render('serviceDetail', {singleService: singleService})
    },
    create: function(req, res) {
        res.render("service-create-form");
    },
    processCreate: function(req, res) {
        // Traigo constante de servicios y transformo al JSON en un array
        const services = JSON.parse(fs.readFileSync(servicesFilePath, 'utf-8'));
        // Incluyo la info del formulario y creo el objeto literal a sumar al array
        const newService = {
            id: services[services.length - 1].id + 1,   // Tomo el ultimo servicio, agarro su id y le sumo 1.
            name: req.body.name,
            description: req.body.description,
            image: "person1.png",
            category: req.body.category,
            colors: req.body.colors,
            price: req.body.price,
        }
        services.push(newService); // Pusheo el objeto literal al array
        fs.writeFileSync(servicesFilePath, JSON.stringify(services, null, " ")); // Transformo a JSON y sobreescribo el JSON
        res.redirect("/"); // Mostramos al usuario la vista principal
    },
    edit: function (req, res) {
        // Traigo constante de servicios y transformo al JSON en un array
        const services = JSON.parse(fs.readFileSync(servicesFilePath, "utf-8"));
        // Busco el producto con el mismo id
        const serviceToEdit = services.find(service => {
            return service.id == req.params.id;         
});
        // Muestro la vista del formulario utilizando como parametro el objeto literal serviceToEdit
        res.render("service-edit-form", {serviceToEdit});
},
    processEdit: function(req, res) {
        const services = JSON.parse(fs.readFileSync(servicesFilePath, "utf-8"));
        // Busco el servicio que debe ser editado
        const id = req.params.id;
        let serviceToEdit = services.find(service => service.id == id);
        // Creo el producto "nuevo" que va a reemplazar al anterior
        const editService = {
            id: services.id,
            name: req.body.name,
            description: req.body.description,
            image: "person1.png",
            category: req.body.category,
            profesion: req.body.profesion,
            price: req.body.price,
        }
        // Buscamos la posicion del producto a editar
        let indice = services.findIndex(service => {
            return service.id == id;
        });
        // Reemplazamos
        services[indice] = serviceToEdit;
        // Sobreescribo el JSON
        fs.writeFileSync(servicesFilePath, JSON.stringify(services, null, " "));
        // Redirecciono al home
        res.redirect("/");

    }
};
  
  // Exportamos 
  module.exports = servicesController;