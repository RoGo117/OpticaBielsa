const { Sequelize } = require("sequelize");

// Configura aquí tus credenciales de conexión
const sequelize = new Sequelize("optica_bielsa", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Puedes cambiarlo a true para ver las queries
  define: {
    freezeTableName: true
  }
});

module.exports = sequelize;
