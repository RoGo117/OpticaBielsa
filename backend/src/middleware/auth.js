const jwt = require("jsonwebtoken")
const { getConnection } = require("../config/database")

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No hay token, acceso denegado",
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Verificar que el usuario existe y está activo
    const connection = getConnection()
    const [users] = await connection.execute("SELECT id, nombre, email, rol FROM usuarios WHERE id = ?", [decoded.id])

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Token no válido",
      })
    }

    req.user = users[0]
    next()
  } catch (error) {
    console.error("Error en middleware de autenticación:", error)
    res.status(401).json({
      success: false,
      message: "Token no válido",
    })
  }
}

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Acceso denegado",
      })
    }

    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({
        success: false,
        message: "No tienes permisos para realizar esta acción",
      })
    }

    next()
  }
}

module.exports = { auth, authorize }
