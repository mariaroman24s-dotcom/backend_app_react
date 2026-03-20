const db = require('../models/connection');

async function obtener(req, res){
    try {
        const query = "SELECT * FROM postres";
        const resultado = await db.query(query);
        res.json(resultado.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al obtener los postres");
    }
}

async function obtener_por_id(req, res){
    const { id } = req.params;

    try {
        const query = "SELECT * FROM postres WHERE id_postre = $1";
        const result = await db.query(query, [id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al obtener el postre");
    }
}

function insertar(req, res){
    try {
        const { nombre, ingredientes, instrucciones, tiempo, calorias, proteina, id_usuario } = req.body;

        const query = `
        INSERT INTO postres 
        (nombre, ingredientes, instrucciones, tiempo, calorias, proteina, id_usuario)
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        `;

        db.query(query, [nombre, ingredientes, instrucciones, tiempo, calorias, proteina, id_usuario]);

        res.send("Postre agregado correctamente");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al insertar postre");
    }
}

function actualizar(req, res){
    try {
        const { nombre, ingredientes, instrucciones, tiempo, calorias, proteina } = req.body;

        const query = `
        UPDATE postres 
        SET nombre=$1, ingredientes=$2, instrucciones=$3, tiempo=$4, calorias=$5, proteina=$6
        WHERE id_postre=$7
        `;

        db.query(query, [nombre, ingredientes, instrucciones, tiempo, calorias, proteina, req.params.id]);

        res.send("Postre actualizado correctamente");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al actualizar postre");
    }
}

function eliminar(req, res){
    try {
        const query = "DELETE FROM postres WHERE id_postre = $1";
        db.query(query, [req.params.id]);

        res.send("Postre eliminado correctamente");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al eliminar postre");
    }
}

module.exports = {
    obtener,
    obtener_por_id,
    insertar,
    actualizar,
    eliminar
};