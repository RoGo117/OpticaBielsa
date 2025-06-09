const Inventario = require("../database/models/Inventario");
const Producto = require("../database/models/Producto");

async function getAllMovimientos() {
  return await Inventario.findAll({
    include: {
      model: Producto,
      attributes: ["id", "nombre", "categoria", "marca"],
    },
    order: [["fecha", "DESC"]],
  });
}

async function createMovimiento(data) {
  const movimiento = await Inventario.create(data);
  return movimiento.id;
}

module.exports = {
  getAllMovimientos,
  createMovimiento,
};
