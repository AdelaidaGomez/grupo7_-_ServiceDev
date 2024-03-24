const express = require('express')
// Requerimos el router desde express
const router = express.Router()

const servicesControllerApi = require('../controllers/servicesControllerApi.js');

router.get("/", servicesControllerApi.count);
router.get("/detail/:id", servicesControllerApi.detail);

module.exports = router;