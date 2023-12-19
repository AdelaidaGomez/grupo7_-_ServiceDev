const express = require('express')
// Requerimos el router desde express
const router = express.Router()

// Requerimos el objeto literal desde controllers
const userController = require('../controller/userController.js');

router.get('/register', userController.register);
router.get('/login', userController.login);


// Exportamos Router
module.exports = router;