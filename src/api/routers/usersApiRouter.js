const express = require('express');
// Requerimos el router desde express
const router = express.Router();

const userControllerApi = require('../controllers/userControllerApi.js');

router.get("/user", userControllerApi.list);
router.get("/user/:id", userControllerApi.detail);

module.exports = router;