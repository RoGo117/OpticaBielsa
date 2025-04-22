const sequelize = require("./db");

// Importar modelos
const Categoria = require("./models/categoria");
// Si luego creas productos y tienen relación:
// const Producto = require("./models/Producto");

// Registrar modelos (esto es útil para sincronizar después)
const models = {
  Categoria,
  // Producto,
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
