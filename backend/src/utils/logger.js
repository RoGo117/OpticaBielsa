const fs = require("fs")
const path = require("path")

// Crear directorio de logs si no existe
const logsDir = path.join(__dirname, "../logs")
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir)
}

const getTimestamp = () => {
  return new Date().toISOString()
}

const writeLog = (level, message) => {
  const timestamp = getTimestamp()
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`

  // Escribir en consola
  console.log(logMessage.trim())

  // Escribir en archivo
  const logFile = path.join(logsDir, `${new Date().toISOString().split("T")[0]}.log`)
  fs.appendFileSync(logFile, logMessage)
}

const logger = {
  info: (message) => writeLog("info", message),
  error: (message) => writeLog("error", message),
  warn: (message) => writeLog("warn", message),
  debug: (message) => writeLog("debug", message),
}

module.exports = logger
