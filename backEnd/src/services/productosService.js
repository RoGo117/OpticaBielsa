const Producto = require("../database/models/producto");

async function getAllProductos() {
  try {
    return await Producto.findAll();
  } catch (error) {
    console.error("❌ Error real en getAllProductos:", error);
    throw error;
  }
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
