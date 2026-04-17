module.exports = (req, res, next) => {
  console.log("Auth middleware ativo");
  next();
};