const express = require("express");
const router = express.Router();

const autenticarToken = require("../middleware/auth");

// 🔐 DADOS MOCK (MVP - depois você liga no banco)
let alunos = [
    { id: 1, nome: "João Silva", serie: "1A" },
    { id: 2, nome: "Maria Souza", serie: "2B" }
];


// ✔ LISTAR ALUNOS (PROTEGIDO)
router.get("/", autenticarToken, (req, res) => {
    res.json({
        msg: "Lista de alunos carregada com sucesso",
        userLogado: req.user,
        dados: alunos
    });
});


// ✔ BUSCAR ALUNO POR ID (PROTEGIDO)
router.get("/:id", autenticarToken, (req, res) => {
    const aluno = alunos.find(a => a.id == req.params.id);

    if (!aluno) {
        return res.status(404).json({ erro: "Aluno não encontrado" });
    }

    res.json(aluno);
});


// ✔ CADASTRAR ALUNO (PROTEGIDO)
router.post("/", autenticarToken, (req, res) => {
    const { nome, serie } = req.body;

    if (!nome || !serie) {
        return res.status(400).json({ erro: "Nome e série são obrigatórios" });
    }

    const novoAluno = {
        id: alunos.length + 1,
        nome,
        serie
    };

    alunos.push(novoAluno);

    res.status(201).json(novoAluno);
});


// ✔ DELETAR ALUNO (PROTEGIDO)
router.delete("/:id", autenticarToken, (req, res) => {
    const index = alunos.findIndex(a => a.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ erro: "Aluno não encontrado" });
    }

    alunos.splice(index, 1);

    res.json({ msg: "Aluno removido com sucesso" });
});


module.exports = router;