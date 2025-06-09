const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const { connectDB } = require("./config/database");
const errorHandler = require("./middleware/errorHandler");
const logger = require("./utils/logger");

// Importar rutas
const authRoutes = require("./routes/auth");
const usuariosRoutes = require("./routes/usuarios");
const productosRoutes = require("./routes/productos");
const citasRoutes = require("./routes/citas");
const ventasRoutes = require("./routes/ventas");
const inventarioRoutes = require("./routes/inventario");
const logsRoutes = require("./routes/logs");
const dashboardRoutes = require("./routes/dashboard");

const app = express()

// Configuración de seguridad
app.use(helmet())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por ventana de tiempo
  message: "Demasiadas peticiones desde esta IP, intenta de nuevo más tarde.",
})
app.use(limiter)

// CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
)

// Middleware para parsing
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))

// Servir archivos estáticos
app.use("/uploads", express.static("uploads"))

// Logging de requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path} - ${req.ip}`)
  next()
})

// Rutas de la API
app.use("/api/auth", authRoutes)
app.use("/api/usuarios", usuariosRoutes)
app.use("/api/productos", productosRoutes)
app.use("/api/citas", citasRoutes)
app.use("/api/ventas", ventasRoutes)
app.use("/api/inventario", inventarioRoutes)
app.use("/api/logs", logsRoutes)
app.use("/api/dashboard", dashboardRoutes)

// Ruta de prueba
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API de Óptica Bielsa funcionando correctamente",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  })
})

// Manejo de rutas no encontradas
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada",
  })
})

// Middleware de manejo de errores
app.use(errorHandler)

const PORT = process.env.PORT || 5000

// Inicializar servidor
const startServer = async () => {
  try {
    // Conectar a la base de datos
    await connectDB()

    app.listen(PORT, () => {
      console.log(`- Servidor corriendo en puerto ${PORT}`)
      console.log(`- Dashboard: http://localhost:${PORT}/api/health`)
      console.log(`- Base de datos: ${process.env.DB_NAME}`)
    })
  } catch (error) {
    console.error("!!! Error al iniciar el servidor:", error)
    process.exit(1)
  }
}

startServer()

// Manejo de errores no capturados
process.on("unhandledRejection", (err) => {
  console.error("!!! Error: ", err)
  process.exit(1)
})

process.on("uncaughtException", (err) => {
  console.error("!!! Error: ", err)
  process.exit(1)
})
