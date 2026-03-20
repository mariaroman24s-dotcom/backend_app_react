const db = require('../models/connection');

async function obtener(req, res){
    try {
        const query = "SELECT * FROM recetas";
        const resultado = await db.query(query);
        res.json(resultado.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al obtener las recetas");
    }
}

async function obtener_por_id(req, res){
    const { id } = req.params;

    try {
        const query = "SELECT * FROM recetas WHERE id_receta = $1";
        const result = await db.query(query, [id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al obtener la receta");
    }
}

function insertar(req, res){
    try {
        const { nombre, ingredientes, instrucciones, tiempo, calorias, proteina, id_usuario } = req.body;

        const query = `
        INSERT INTO recetas 
        (nombre, ingredientes, instrucciones, tiempo, calorias, proteina, id_usuario)
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        `;

        db.query(query, [nombre, ingredientes, instrucciones, tiempo, calorias, proteina, id_usuario]);

        res.send("Receta agregada correctamente ");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al insertar receta");
    }
}

function actualizar(req, res){
    try {
        const { nombre, ingredientes, instrucciones, tiempo, calorias, proteina } = req.body;

        const query = `
        UPDATE recetas 
        SET nombre=$1, ingredientes=$2, instrucciones=$3, tiempo=$4, calorias=$5, proteina=$6
        WHERE id_receta=$7
        `;

        db.query(query, [nombre, ingredientes, instrucciones, tiempo, calorias, proteina, req.params.id]);

        res.send("Receta actualizada correctamente");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al actualizar receta");
    }
}

function eliminar(req, res){
    try {
        const query = "DELETE FROM recetas WHERE id_receta = $1";
        db.query(query, [req.params.id]);

        res.send("Receta eliminada correctamente");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al eliminar receta");
    }
}

module.exports = {
    obtener,
    obtener_por_id,
    insertar,
    actualizar,
    eliminar
};