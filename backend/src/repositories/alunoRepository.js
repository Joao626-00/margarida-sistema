const db = require("../config/db");

exports.listar = async () => {
    const result = await db.query("SELECT * FROM alunos");
    return result.rows;
};

exports.criar = async (nome, serie) => {
    const result = await db.query(
        "INSERT INTO alunos (nome, serie) VALUES ($1, $2) RETURNING *",
        [nome, serie]
    );

    return result.rows[0];
};