const Usuario = require("../database/models/Usuario");
const bcrypt = require("bcryptjs");

// Buscar usuario por email
async function findUserByEmail(email) {
  return await Usuario.findOne({
    where: { email },
    attributes: ["id", "nombre", "email", "telefono", "rol", "password_hash"],
  });
}

// Validar contraseña
async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = {
  findUserByEmail,
  validatePassword,
};
