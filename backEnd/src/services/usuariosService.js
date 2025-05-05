const Usuario = require("../database/models/usuario");

async function getAllUsuarios() {
  return await Usuario.findAll();
}

async function createUsuario(data) {
  const nuevo = await Usuario.create(data);
  return nuevo.id;
}

async function updateUsuario(id, data) {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) throw new Error("Usuario no encontrado");
  await usuario.update(data);
  return usuario;
}

async function deleteUsuario(id) {
  return await Usuario.destroy({ where: { id } });
}

module.exports = {
  getAllUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario
};
