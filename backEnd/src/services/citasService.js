const Cita = require("../database/models/cita");

async function getAllCitas() {
  return await Cita.findAll();
}

async function createCita(data) {
  const cita = await Cita.create(data);
  return cita.id;
}

async function updateCita(id, data) {
  const cita = await Cita.findByPk(id);
  if (!cita) throw new Error("Cita no encontrada");
  await cita.update(data);
  return cita;
}

async function deleteCita(id) {
  return await Cita.destroy({ where: { id } });
}

module.exports = {
  getAllCitas,
  createCita,
  updateCita,
  deleteCita
};
