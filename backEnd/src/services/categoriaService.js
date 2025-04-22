const db = require("../database/db");
const Categoria = require("../database/models/categoria");

async function getAllCategorias() {
  return await Categoria.findAll();
}

async function createCategoria(nombre) {
  const nueva = await Categoria.create({ nombre });
  return nueva.id;
}

async function updateCategoria(id, nombre) {
  const categoria = await Categoria.findByPk(id);
  if (!categoria) throw new Error("Categoría no encontrada");

  categoria.nombre = nombre;
  await categoria.save();
  return categoria;
}

async function deleteCategoria(id) {
  const deleted = await Categoria.destroy({ where: { id } });
  return deleted; // Devuelve 1 si se borró, 0 si no existía
}

module.exports = {
  getAllCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria
};
