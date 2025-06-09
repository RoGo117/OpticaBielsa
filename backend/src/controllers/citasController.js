const citasService = require("../services/citasService");
const { sendResponse } = require("../utils/helpers");
const logger = require("../utils/logger");

const getCitas = async (req, res) => {
  try {
    const citas = await citasService.getAllCitas();
    sendResponse(res, 200, true, "Citas obtenidas exitosamente", citas);
  } catch (error) {
    logger.error(`Error obteniendo citas: ${error.message}`);
    sendResponse(res, 500, false, "Error interno del servidor");
  }
};

const getCitaById = async (req, res) => {
  try {
    const { id } = req.params;
    const cita = await citasService.getCitaById(id);
    if (!cita) {
      return sendResponse(res, 404, false, "Cita no encontrada");
    }
    sendResponse(res, 200, true, "Cita obtenida exitosamente", cita);
  } catch (error) {
    logger.error(`Error obteniendo cita: ${error.message}`);
    sendResponse(res, 500, false, "Error interno del servidor");
  }
};

const createCita = async (req, res) => {
  try {
    const citaId = await citasService.createCita(req.body);
    sendResponse(res, 201, true, "Cita creada exitosamente", { id: citaId });
  } catch (error) {
    logger.error(`Error creando cita: ${error.message}`);
    sendResponse(res, 500, false, "Error interno del servidor");
  }
};

const updateCita = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await citasService.updateCita(id, req.body);
    if (!updated) {
      return sendResponse(res, 404, false, "Cita no encontrada o sin cambios");
    }
    sendResponse(res, 200, true, "Cita actualizada exitosamente");
  } catch (error) {
    logger.error(`Error actualizando cita: ${error.message}`);
    sendResponse(res, 500, false, "Error interno del servidor");
  }
};

const deleteCita = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await citasService.deleteCita(id);
    if (!deleted) {
      return sendResponse(res, 404, false, "Cita no encontrada");
    }
    sendResponse(res, 200, true, "Cita eliminada exitosamente");
  } catch (error) {
    logger.error(`Error eliminando cita: ${error.message}`);
    sendResponse(res, 500, false, "Error interno del servidor");
  }
};

module.exports = {
  getCitas,
  getCitaById,
  createCita,
  updateCita,
  deleteCita,
};
