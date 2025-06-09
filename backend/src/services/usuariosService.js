const Usuario = require("../database/models/Usuario");

// Obtener todos los usuarios
async function getAllUsers({ rol, search, limit, offset }) {
  const where = {};
  if (rol) where.rol = rol;
  if (search) where.nombre = { [Op.like]: `%${search}%` };

  return await Usuario.findAndCountAll({
    where,
    limit,
    offset,
  });
}

// Obtener un usuario por ID
async function getUserById(id) {
  return await Usuario.findByPk(id);
}

// Crear un usuario
async function createUser(data) {
  const usuario = await Usuario.create(data);
  return usuario.id;
}

// Actualizar un usuario
async function updateUser(id, data) {
  const [updatedRows] = await Usuario.update(data, { where: { id } });
  return updatedRows > 0;
}

// Eliminar un usuario
async function deleteUser(id) {
  const deletedRows = await Usuario.destroy({ where: { id } });
  return deletedRows > 0;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
