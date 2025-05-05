const citasService = require("../services/citasService");

const getCitas = async (req, res) => {
  try {
    const citas = await citasService.getAllCitas();
    res.json(citas);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener citas" });
  }
};

const addCita = async (req, res) => {
  try {
    const id = await citasService.createCita(req.body);
    res.status(201).json({ message: "Cita registrada", id });
  } catch (err) {
    res.status(400).json({ error: "Datos inválidos" });
  }
};

const updateCita = async (req, res) => {
  const { id } = req.params;
  try {
    const actualizada = await citasService.updateCita(id, req.body);
    res.json({ message: "Cita actualizada", actualizada });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const deleteCita = async (req, res) => {
  const { id } = req.params;
  try {
    const eliminada = await citasService.deleteCita(id);
    if (eliminada) {
      res.json({ message: "Cita eliminada" });
    } else {
      res.status(404).json({ error: "Cita no encontrada" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar cita" });
  }
};

module.exports = {
  getCitas,
  addCita,
  updateCita,
  deleteCita
};
