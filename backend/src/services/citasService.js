const Cita = require("../database/models/Cita");

async function getAllCitas() {
  return await Cita.findAll();
}

async function getCitaById(id) {
  return await Cita.findByPk(id);
}

async function createCita(data) {
  const cita = await Cita.create(data);
  return cita.id;
}

async function updateCita(id, data) {
  const [updated] = await Cita.update(data, { where: { id } });
  return updated;
}

async function deleteCita(id) {
  const cita = await Cita.findByPk(id);
  if (!cita) return false;
  await cita.destroy();
  return true;
}

module.exports = {
  getAllCitas,
  getCitaById,
  createCita,
  updateCita,
  deleteCita,
};
