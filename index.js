const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const usuarios = require("./src/routes/usuarios");
const recetas = require("./src/routes/recetas");
const postres = require("./src/routes/postres");

app.use("/usuarios", usuarios);
app.use("/recetas", recetas);
app.use("/postres", postres);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor ejecutándose en puerto", PORT);
});