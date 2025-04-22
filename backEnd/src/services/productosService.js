const Producto = require("../database/models/producto");

async function getAllProductos() {
  return await Producto.findAll();
}

async function createProducto(data) {
  const nuevo = await Producto.create(data);
  return nuevo.id;
}

async function updateProducto(id, data) {
  const producto = await Producto.findByPk(id);
  if (!producto) throw new Error("Producto no encontrado");

  await producto.update(data);
  return producto;
}

module.exports = {
  getAllProductos,
  createProducto,
  updateProducto
};
