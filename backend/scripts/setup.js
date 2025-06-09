const mysql = require("mysql2/promise")
require("dotenv").config()

const setupDatabase = async () => {
  try {
    console.log("Configurando base de datos...")

    // Conectar sin especificar base de datos
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
    })

    // Crear base de datos si no existe
    await connection.execute(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    )
    console.log(`Base de datos '${process.env.DB_NAME}' creada/verificada`)

    // Usar la base de datos
    await connection.execute(`USE ${process.env.DB_NAME}`)

    // Verificar tablas
    const [tables] = await connection.execute("SHOW TABLES")
    console.log(`Tablas encontradas: ${tables.length}`)

    if (tables.length === 0) {
      console.log("!!! No se encontraron tablas. Por favor, importa el archivo SQL en phpMyAdmin.")
    } else {
      console.log("Base de datos configurada correctamente")
    }

    await connection.end()
  } catch (error) {
    console.error("!!! Error configurando base de datos:", error.message)
    process.exit(1)
  }
}

setupDatabase()
