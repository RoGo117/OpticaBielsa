const Usuario = require("./models/Usuario");
const Producto = require("./models/Producto");
const Cita = require("./models/Cita");
const Venta = require("./models/Venta");
const MovimientoInventario = require("./models/MovimientoInventario");
const HistorialCliente = require("./models/HistorialCliente");
const Log = require("./models/Log");

// Relaciones básicas de ejemplo
Usuario.hasMany(Cita, { foreignKey: "usuario_id" });
Cita.belongsTo(Usuario, { foreignKey: "usuario_id" });

Usuario.hasMany(Venta, { foreignKey: "cliente_id" });
Venta.belongsTo(Usuario, { foreignKey: "cliente_id" });

Producto.hasMany(MovimientoInventario, { foreignKey: "producto_id" });
MovimientoInventario.belongsTo(Producto, { foreignKey: "producto_id" });

module.exports = {
  Usuario,
  Producto,
  Cita,
  Venta,
  MovimientoInventario,
  HistorialCliente,
  Log,
};
