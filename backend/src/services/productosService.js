const Producto = require("../database/models/Producto");
const db = require("../database/db");

// Obtener todos los productos
async function getAllProducts() {
  return await Producto.findAll();
}

// Obtener producto por ID
async function getProductById(id) {
  return await Producto.findByPk(id);
}

// Crear nuevo producto
async function createProduct(data) {
  const producto = await Producto.create(data);
  return producto.id;
}

// Actualizar producto
async function updateProduct(id, data) {
  const [updated] = await Producto.update(data, { where: { id } });
  return updated;
}

// Eliminar producto
async function deleteProduct(id) {
  const producto = await Producto.findByPk(id);
  if (!producto) return false;
  await producto.destroy();
  return true;
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
