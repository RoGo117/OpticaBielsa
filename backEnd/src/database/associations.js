const sequelize = require("./db");

// Importar modelos
const Categoria = require("./models/categoria");
const Producto = require("./models/producto");
const Usuario = require("./models/usuario");
const Cliente = require("./models/cliente");
const Cita = require("./models/cita");
const StockMovimiento = require("./models/stock_movimiento");


// Registrar modelos
const models = {
  Categoria,
  Producto,
};


Object.values(models).forEach((model) => {
  if (typeof model.associate === "function") {
    model.associate(models);
  }
});

module.exports = {
  sequelize,
  ...models
};
