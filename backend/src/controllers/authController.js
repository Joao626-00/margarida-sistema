const jwt = require("jsonwebtoken");

console.log("🔥 AUTH CONTROLLER ATIVO");

// usuários fixos (MVP)
const users = [
    { id: 1, username: "admin", password: "1234", role: "admin" },
    { id: 2, username: "professor", password: "1234", role: "teacher" }
];

exports.login = (req, res) => {
    let { username, password } = req.body;

    console.log("LOGIN RECEBIDO:", username);

    // normalização de entrada
    username = String(username || "").toLowerCase().trim();
    password = String(password || "").trim();

    // busca usuário
    const user = users.find(u => u.username === username);

    if (!user) {
        return res.status(401).json({ erro: "Usuário inválido" });
    }

    if (user.password !== password) {
        return res.status(401).json({ erro: "Senha inválida" });
    }

    // gera token JWT
    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: user.role
        },
        "SEGREDO_SUPER_SEGURO",
        { expiresIn: "1h" }
    );

    // remove senha antes de retornar (SEGURANÇA)
    const { password: _, ...userSafe } = user;

    return res.json({
        token,
        user: userSafe
    });
};