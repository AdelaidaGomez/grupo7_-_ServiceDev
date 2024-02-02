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
        //Traemos la informacion del usuario desde el session cuando hacemos el processLogIn desde usercontroller
        return res.render('productCart', {
            user: req.session.userLogged
        })
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
        console.log(req.body);
        const newService = {
            id: services[services.length - 1].id + 1,   // Tomo el ultimo servicio, agarro su id y le sumo 1.
            name: req.body.name,
            description: req.body.description,
            image: req.file.filename,
            /* category: req.body.category, */
            especialidad: req.body.especialidad,
            price: req.body.price
        }
        services.push(newService); // Pusheo el objeto literal al array
        fs.writeFileSync(servicesFilePath, JSON.stringify(services, null, " ")); // Transformo a JSON y sobreescribo el JSON
        res.redirect("/services"); // Mostramos al usuario la vista principal
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
        serviceToEdit = {
            id: serviceToEdit.id,
            name: req.body.name,
            description: req.body.description,
            image: req.file != undefined ? req.file.filename : serviceToEdit.image,
            /* category: req.body.category, */
            especialidad: req.body.especialidad,
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
        // Redirecciono a la pagina de productos
        res.redirect("/services");

    },
    destroy: (req, res) => {
        let services = JSON.parse(fs.readFileSync(servicesFilePath, 'utf-8'));

        //eliminar
        services = services.filter(service => {
            //Creamos un array nuevo menos en el que estamos parados
            return service.id != req.params.id
        })
        fs.writeFileSync(servicesFilePath, JSON.stringify(services, null, " "));
        //Hacemos el redirect
        res.redirect('/services')
    }
};
  
  // Exportamos 
  module.exports = servicesController;