const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "margarida_novo",
    password: "1234",
    port: 5432
});

pool.connect()
    .then(() => console.log("🔥 Banco conectado com sucesso"))
    .catch(err => console.error("❌ Erro ao conectar no banco:", err));

module.exports = pool;