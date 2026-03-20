const db = require('../models/connection');

async function login(req, res){

    const { correo, contra } = req.body;

    try {

        const query = "SELECT * FROM usuarios WHERE correo=$1 AND contra=$2";

        const result = await db.query(query,[correo,contra]);

        if(result.rows.length > 0){
            res.json({ success:true, usuario: result.rows[0] });
        }else{
            res.json({ success:false });
        }

    } catch (err) {

        console.error(err);
        res.status(500).send("Error en login");

    }

}

async function registrar(req, res){

const { nombre, apellido_p, apellido_m, correo, contra } = req.body;

try{

const query = `
INSERT INTO usuarios (nombre, apellido_p, apellido_m, correo, contra)
VALUES ($1,$2,$3,$4,$5)
`;

await db.query(query,[nombre,apellido_p,apellido_m,correo,contra]);

res.json({success:true});

}catch(err){

console.error(err);
res.status(500).send("Error al registrar usuario");

}

}

module.exports = { login, registrar };