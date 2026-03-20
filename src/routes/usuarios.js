const express = require('express');
const router = express.Router();
const funciones = require('../controller/usuarios');

router.post("/login", funciones.login);
router.post("/registrar", funciones.registrar);

module.exports = router;