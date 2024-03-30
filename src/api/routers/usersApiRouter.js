const express = require('express');
// Requerimos el router desde express
const router = express.Router();

const userControllerApi = require('../controllers/userControllerApi.js');

router.get("/count", userControllerApi.count);
router.get("/alls", userControllerApi.alls);
router.get("/detail/:id", userControllerApi.detail);

module.exports = router;