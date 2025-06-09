const logsService = require("../services/logsService");
const { sendResponse } = require("../utils/helpers");
const logger = require("../utils/logger");

const getLogs = async (req, res) => {
  try {
    const logs = await logsService.getAllLogs();
    sendResponse(res, 200, true, "Logs obtenidos exitosamente", logs);
  } catch (error) {
    logger.error(`Error obteniendo logs: ${error.message}`);
    sendResponse(res, 500, false, "Error interno del servidor");
  }
};

module.exports = {
  getLogs,
};
