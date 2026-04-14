const pool = require("../config/db");

// 🔥 LISTAR ALUNOS
exports.listarAlunos = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM alunos ORDER BY id");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao buscar alunos" });
    }
};

// 🔥 CRIAR ALUNO
exports.criarAluno = async (req, res) => {
    try {
        const {
            nome,
            data_nascimento,
            serie,
            turma,
            rg
        } = req.body;

        const result = await pool.query(
            `INSERT INTO alunos (nome, data_nascimento, serie, turma, rg)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [nome, data_nascimento, serie, turma, rg]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao criar aluno" });
    }
};

// 🔥 ATUALIZAR ALUNO
exports.atualizarAluno = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, serie, turma, rg } = req.body;

        const result = await pool.query(
            `UPDATE alunos 
             SET nome=$1, serie=$2, turma=$3, rg=$4
             WHERE id=$5
             RETURNING *`,
            [nome, serie, turma, rg, id]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao atualizar aluno" });
    }
};

// 🔥 DELETAR ALUNO
exports.deletarAluno = async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query("DELETE FROM alunos WHERE id=$1", [id]);

        res.json({ ok: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao deletar aluno" });
    }
};