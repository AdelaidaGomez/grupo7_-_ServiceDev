// Exportamos Router
const express = require('express');
// Requerimos el router desde express
const router = express.Router();
const path = require('path');


// Requerimos el objeto literal para products desde controllers
const userController = require('../controller/userController.js');

// Requerimos multer para cargar archvios de imagen desde cliente a servidor
const multer = require('multer');

//configuración de variable multer donde se especifi    ca ruto de almacenamiento y nombre de archivo
const multerStorage = multer.diskStorage( {
    destination: (req, file, storageDestination) => {
        const folder = path.join(__dirname, '../public/image/registerImage');
        storageDestination(null, folder)
    },
    fielname: (req, file, nameImage ) => {
        const image = Date.now() + path.extname(file.originalname);
        nameImage(null,image );
    },
}  )

const upload = multer({storage : multerStorage});

router.get('/login', userController.login); // todos los servicios, recordar que como es otro archivo se inicia con / ya ue definimos en app que tiene /services 
router.get('/register', userController.register); //Recordar que para entrar a este la ruta debe ser: Servido/services/productCart
router.post('/register', upload.single('foto_usuario'), userController.createRegister); //se establece el metodo post para enviar los datos registrados en el formulario
// Ruteo de formulario create

// Exportamos Router
module.exports = router;
