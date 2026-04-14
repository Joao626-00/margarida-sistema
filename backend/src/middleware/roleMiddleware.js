module.exports = (rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ erro: "Não autenticado" });
        }

        if (!rolesPermitidos.includes(req.user.role)) {
            return res.status(403).json({ erro: "Sem permissão" });
        }

        next();
    };
};