const StockMovimiento = require("../database/models/stock_movimiento");

async function getAllMovimientos() {
  return await StockMovimiento.findAll();
}

async function createMovimiento(data) {
  return await StockMovimiento.create(data);
}

async function updateMovimiento(id, data) {
  const movimiento = await StockMovimiento.findByPk(id);
  if (!movimiento) throw new Error("Movimiento no encontrado");
  await movimiento.update(data);
  return movimiento;
}

async function deleteMovimiento(id) {
  return await StockMovimiento.destroy({ where: { id } });
}

module.exports = {
  getAllMovimientos,
  createMovimiento,
  updateMovimiento,
  deleteMovimiento
};
