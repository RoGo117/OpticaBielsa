const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");

// Generar hash de contraseña
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Comparar contraseña y hash
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Generar token JWT
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// Formatear fecha
const formatDate = (date) => {
  return moment(date).format("YYYY-MM-DD");
};

// Formatear fecha y hora
const formatDateTime = (date) => {
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
};

// Generar respuesta estándar
const sendResponse = (res, statusCode, success, message, data = null) => {
  res.status(statusCode).json({
    success,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
};

// Paginación (offset y limit)
const paginate = (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  return {
    limit: Number.parseInt(limit),
    offset: Number.parseInt(offset),
  };
};

// Exportar todo
module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  formatDate,
  formatDateTime,
  sendResponse,
  paginate,
};
