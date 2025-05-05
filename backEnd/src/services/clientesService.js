const Cliente = require("../database/models/cliente");

async function getAllClientes() {
  return await Cliente.findAll();
}

async function createCliente(data) {
  const nuevo = await Cliente.create(data);
  return nuevo.id;
}

async function updateCliente(id, data) {
  const cliente = await Cliente.findByPk(id);
  if (!cliente) throw new Error("Cliente no encontrado");
  await cliente.update(data);
  return cliente;
}

async function deleteCliente(id) {
  return await Cliente.destroy({ where: { id } });
}

module.exports = {
  getAllClientes,
  createCliente,
  updateCliente,
  deleteCliente
};
