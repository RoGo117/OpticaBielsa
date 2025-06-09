const Log = require("../database/models/Log");

async function getAllLogs() {
  return await Log.findAll({ order: [["fecha", "DESC"]] });
}

async function createLog(data) {
  await Log.create(data);
}

module.exports = {
  getAllLogs,
  createLog,
};
