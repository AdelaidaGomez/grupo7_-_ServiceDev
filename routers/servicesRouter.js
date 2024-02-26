const express = require('express')
// Requerimos el router desde express
const router = express.Router()

// Requerimos el objeto literal para products desde CONTROLLERS
const servicesController = require('../controller/servicesController.js');
// middleWare no esta logheado no habilitar productCart
let authMiddleware = require("../middlewares/authMiddleware");

// Requerimos multer y lo guardamos en una constante
const multer = require("multer");

const path = require("path");
const services = require('../models/services') //requerimos el archivo services con todas las funcionalidades crud para utilizar cada metodo;

// MULTER
//configuración de variable multer donde se especifica ruto de almacenamiento y nombre de archivo
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/fotoPerfilServicios'))
    },
    filename: (req, file, cb) => {
        console.log(file);
        const newFileName = 'avatar-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});
//Ejecutamos la configuracion de multer
const uploadFile = multer({storage: storage})

// LEER SERVICIOS
router.get('/', servicesController.allProducts); // todos los servicios, recordar que como es otro archivo se inicia con / ya que definimos en app que tiene /services 
router.get('/productCart', authMiddleware, servicesController.productCart); //Recordar que para entrar a este la ruta debe ser: Servidor/services/productCart

router.get('/serviceDetail/:id', servicesController.detail)

// CREAR SERVICIO
router.get("/create", servicesController.create) // Para devolverle al usuario el formulario para crear servicio
router.post("/create", uploadFile.single("image"), servicesController.processCreate) // Para agregar el servicio creado

// EDITAR SERVICIO
router.get("/edit/:id", servicesController.edit) // Para devolverle al usuario el formulario para editar servicio
router.put("/edit/:id", uploadFile.single("image"), servicesController.processEdit) // Para actualizar el producto editado

// ELIMINAR SERVICIO
router.delete("/delete/:id", servicesController.destroy) //Borrar un servicio

// Exportamos Router
module.exports = router;
