// src/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const Usuario = require("../database/models/Usuario");
const { sendResponse } = require("../utils/helpers");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return sendResponse(res, 401, false, "No hay token, acceso denegado");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Usuario.findByPk(decoded.id);

    if (!user) {
      return sendResponse(res, 401, false, "Token inválido o usuario no encontrado");
    }

    req.user = user;
    next();
  } catch (error) {
    return sendResponse(res, 401, false, "Token inválido o expirado");
  }
};

module.exports = authMiddleware;
