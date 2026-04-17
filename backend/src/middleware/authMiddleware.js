const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ erro: "Token não enviado" });
    }

    const token = authHeader.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ erro: "Token inválido" });
    }

    try {
        const decoded = jwt.verify(token, "SEGREDO_SUPER_SEGURO");
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ erro: "Token inválido ou expirado" });
    }
};