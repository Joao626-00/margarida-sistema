const express = require("express");
const cors = require("cors");

require("./config/db");

const alunoRoutes = require("./routes/alunoRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

console.log("🔥 APP.JS CARREGADO CORRETAMENTE");

// 🔥 ROTA DE TESTE


app.get("/", (req, res) => {
    res.json({
        status: "MARGARIDA ONLINE",
        message: "API rodando corretamente"
    });
});

// 🔐 ROTAS
app.use("/auth", authRoutes);
app.use("/alunos", alunoRoutes);

module.exports = app;