const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// =====================
// ROTAS ALUNOS
// =====================
app.get("/alunos", (req, res) => {
  res.json({
    dados: [
      { id: 1, nome: "João", serie: "3", turma: "A", sala: "1" },
      { id: 2, nome: "Maria", serie: "3", turma: "B", sala: "2" }
    ]
  });
});

// =====================
// ROTAS TURMAS (ESSENCIAL)
// =====================
app.get("/turmas", (req, res) => {
  res.json({
    dados: [
      { id: 1, nome: "Turma A", ano: "3", turno: "Manhã" }
    ]
  });
});

// =====================
// TESTE BASE
// =====================
app.get("/", (req, res) => {
  res.send("API MARGARIDA ON");
});

module.exports = app;