const logger = require("../utils/logger")

const errorHandler = (err, req, res, next) => {
  let error = { ...err }
  error.message = err.message

  // Log del error
  logger.error(`Error: ${error.message}`)

  // Error de MySQL - Duplicate entry
  if (error.code === "ER_DUP_ENTRY") {
    const message = "Recurso duplicado"
    error = { message, statusCode: 400 }
  }

  // Error de MySQL - Foreign key constraint
  if (error.code === "ER_NO_REFERENCED_ROW_2") {
    const message = "Referencia no válida"
    error = { message, statusCode: 400 }
  }

  // Error de validación
  if (error.name === "ValidationError") {
    const message = Object.values(error.errors).map((val) => val.message)
    error = { message, statusCode: 400 }
  }

  // Error de JWT
  if (error.name === "JsonWebTokenError") {
    const message = "Token no válido"
    error = { message, statusCode: 401 }
  }

  // Error de JWT expirado
  if (error.name === "TokenExpiredError") {
    const message = "Token expirado"
    error = { message, statusCode: 401 }
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Error interno del servidor",
  })
}

module.exports = errorHandler
