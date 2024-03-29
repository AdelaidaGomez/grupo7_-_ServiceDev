const express = require('express')
// Requerimos el router desde express
const router = express.Router()

const servicesControllerApi = require('../controllers/servicesControllerApi.js');

router.get("/count", servicesControllerApi.count); // Devuelve el numero total de servicios
router.get("/", servicesControllerApi.services); // Devuelve todos los servicios con sus respectivos detalles
router.get("/detail/:id", servicesControllerApi.detail); // Devuelve un servicio especifico con su detalle
router.get("/:profession", servicesControllerApi.profession); // Devuelve todos los servicios de una profesion especifica

module.exports = router;