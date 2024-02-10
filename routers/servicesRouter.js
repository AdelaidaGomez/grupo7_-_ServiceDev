const express = require('express')
// Requerimos el router desde express
const router = express.Router()

// Requerimos el objeto literal para products desde controllers
const servicesController = require('../controller/servicesController.js');
// middleWare no esta logheado no habilitar productCart
let authMiddleware = require("../middlewares/authMiddleware");

// Requerimos multer y lo guardamos en una constante
const multer = require("multer");

const path = require("path");
const services = require('../models/services') //requerimos el archivo services con todas las funcionalidades crud para utilizar cada metodo;

// MULTER
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // Definimos donde guardamos los archivos
        cb(null, "public/images")
    },
    filename: function(req, file, cb) {
        // Definimos el nombre que tendrán los archivos
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
})
// Asignamos en una constante a la ejecucion de multer
const uploadFile = multer({storage: storage});



router.get('/', servicesController.allProducts); // todos los servicios, recordar que como es otro archivo se inicia con / ya ue definimos en app que tiene /services 
router.get('/productCart', authMiddleware, servicesController.productCart); //Recordar que para entrar a este la ruta debe ser: Servidor/services/productCart

router.get('/serviceDetail/:id', servicesController.detail)

// Ruteo de formulario create
router.get("/create", servicesController.create) // Para devolverle al usuario el formulario para crear servicio
router.post("/create", uploadFile.single("image"), servicesController.processCreate) // Para agregar el servicio creado

// Ruteo de formulario edit
router.get("/edit/:id", servicesController.edit) // Para devolverle al usuario el formulario para editar servicio
router.put("/edit/:id", uploadFile.single("image"), servicesController.processEdit) // Para actualizar el producto editado

router.delete("/delete/:id", servicesController.destroy) //Borrar un servicio

// Exportamos Router
module.exports = router;
