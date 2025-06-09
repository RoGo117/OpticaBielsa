const { body, validationResult } = require("express-validator")

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Errores de validación",
      errors: errors.array(),
    })
  }
  next()
}

// Validaciones para usuarios
const validateUser = [
  body("nombre").notEmpty().withMessage("El nombre es requerido"),
  body("email").isEmail().withMessage("Email no válido"),
  body("telefono").optional().isMobilePhone("es-ES").withMessage("Teléfono no válido"),
  body("rol").isIn(["admin", "cliente", "empleado"]).withMessage("Rol no válido"),
  handleValidationErrors,
]

const validateUserUpdate = [
  body("nombre").optional().notEmpty().withMessage("El nombre no puede estar vacío"),
  body("email").optional().isEmail().withMessage("Email no válido"),
  body("telefono").optional().isMobilePhone("es-ES").withMessage("Teléfono no válido"),
  body("rol").optional().isIn(["admin", "cliente", "empleado"]).withMessage("Rol no válido"),
  handleValidationErrors,
]

// Validaciones para productos
const validateProduct = [
  body("nombre").notEmpty().withMessage("El nombre del producto es requerido"),
  body("categoria").notEmpty().withMessage("La categoría es requerida"),
  body("precio").isFloat({ min: 0 }).withMessage("El precio debe ser un número positivo"),
  body("stock").isInt({ min: 0 }).withMessage("El stock debe ser un número entero positivo"),
  handleValidationErrors,
]

// Validaciones para citas
const validateAppointment = [
  body("usuario_id").isInt().withMessage("ID de usuario no válido"),
  body("servicio").notEmpty().withMessage("El servicio es requerido"),
  body("fecha").isDate().withMessage("Fecha no válida"),
  body("hora")
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
    .withMessage("Hora no válida"),
  handleValidationErrors,
]

// Validaciones para ventas
const validateSale = [
  body("cliente_id").optional().isInt().withMessage("ID de cliente no válido"),
  body("empleado_id").isInt().withMessage("ID de empleado requerido"),
  body("total").isFloat({ min: 0 }).withMessage("El total debe ser un número positivo"),
  handleValidationErrors,
]

// Validaciones para login
const validateLogin = [
  body("email").isEmail().withMessage("Email no válido"),
  body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
  handleValidationErrors,
]

// Validaciones para registro
const validateRegister = [
  body("nombre").notEmpty().withMessage("El nombre es requerido"),
  body("email").isEmail().withMessage("Email no válido"),
  body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
  body("telefono").optional().isMobilePhone("es-ES").withMessage("Teléfono no válido"),
  handleValidationErrors,
]

module.exports = {
  validateUser,
  validateUserUpdate,
  validateProduct,
  validateAppointment,
  validateSale,
  validateLogin,
  validateRegister,
  handleValidationErrors,
}
