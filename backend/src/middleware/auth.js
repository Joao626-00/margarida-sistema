const jwt = require("jsonwebtoken");

function autenticarToken(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ erro: "Token não enviado" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ erro: "Token inválido" });
    }

    try {
        const decoded = jwt.verify(token, "SEGREDO_SUPER_SEGURO");
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ erro: "Token inválido ou expirado" });
    }
}

module.exports = autenticarToken;