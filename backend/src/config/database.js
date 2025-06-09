const mysql = require("mysql2/promise")
require("dotenv").config()

let connection = null

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "optica_bielsa",
  charset: "utf8mb4",
  timezone: "+00:00",
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,
}

const connectDB = async () => {
  try {
    connection = await mysql.createConnection(dbConfig)
    console.log("- Conectado a MySQL - Base de datos:", process.env.DB_NAME)

    // Verificar que las tablas existen
    const [tables] = await connection.execute("SHOW TABLES")
    console.log(`- Tablas encontradas: ${tables.length}`)

    return connection
  } catch (error) {
    console.error("!!! Error conectando a MySQL:", error.message)
    throw error
  }
}

const getConnection = () => {
  if (!connection) {
    throw new Error("!!! Base de datos no conectada")
  }
  return connection
}

const closeConnection = async () => {
  if (connection) {
    await connection.end()
    console.log(" - Conexión a MySQL cerrada")
  }
}

module.exports = {
  connectDB,
  getConnection,
  closeConnection,
}
