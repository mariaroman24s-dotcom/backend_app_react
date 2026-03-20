const express = require('express');
const router = express.Router();

const funciones = require('../controller/postres');

router.get("/obtener", funciones.obtener);

router.get("/obtener_por_id/:id", funciones.obtener_por_id);

router.post("/insertar", funciones.insertar);

router.put("/actualizar/:id", funciones.actualizar);

router.delete("/eliminar/:id", funciones.eliminar);

module.exports = router;