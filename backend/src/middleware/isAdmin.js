
const isAdmin = (req, res, next) => {
  if (req.user.rol !== "admin") {
    return res.status(403).json({ success: false, message: "Acceso denegado: solo administradores" });
  }
  next();
};

module.exports = { isAdmin };
