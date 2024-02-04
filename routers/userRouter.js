// Exportamos Router
const express = require('express');
// Requerimos el router desde express
const router = express.Router();
const path = require('path');


// Requerimos el objeto literal para products desde controllers
const userController = require('../controller/userController.js');
const multer = require('multer'); // Requerimos multer para cargar archvios de imagen desde cliente a servidor

// middleWare si esta logheado no habilitar logIn ni register
let guestMiddleware = require("../middlewares/guestMiddleware");



//configuración de variable multer donde se especifica ruto de almacenamiento y nombre de archivo
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/fotoPerfilusuarios'))
    },
    filename: (req, file, cb) => {
        console.log(file);
        const newFileName = 'avatar-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});
//Ejecutamos la configuracion de multer
const upload = multer({storage: multerStorage})

// VALIDACIONES
const {check} = require("express-validator");
const validacionesLogin = [
    check("email").notEmpty().withMessage("Debe completar el campo de email").bail().isEmail().withMessage("El email no es válido"),
    check("password").notEmpty().withMessage("Debe completar el campo de contraseña").bail().isLength({min: 5})
]
//FALTA validacion register y validacion crear nuevo servicio

/* const {body} = require("express-validator");
const validacionesLogin = [
    body("email").notEmpty().withMessage("campo vacio"),
    body("password").notEmpty().withMessage("campo vacio 2")
] */

router.get('/', guestMiddleware, userController.login); // LOGIN. todos los servicios, recordar que como es otro archivo se inicia con / ya ue definimos en app que tiene /services 
router.post('/', validacionesLogin, userController.processLogin); // Ruteo de validacion de login
// router.get('/register', guestMiddleware, userController.register); //Ruta register
router.get('/', userController.logOut) // Proceso de LogOut

router.get('/register', guestMiddleware, userController.register) // ruta para registro nuevo usuario GET formaulario
router.post('/create', upload.single('avatar'), userController.createRegister); //se establece el metodo post para enviar los datos registrados en el formulario


// Exportamos Router
module.exports = router;
