const express = require('express')
// Requerimos el router desde express
const router = express.Router()

const servicesControllerApi = require('../controllers/servicesControllerApi.js');

router.get("/", servicesControllerApi.count);
router.get("/detail/:id", servicesControllerApi.detail);
router.get("/services/:especialidad", servicesControllerApi.especialidad)

module.exports = router;