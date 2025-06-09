const { sendResponse } = require("../utils/helpers");
const Usuario = require("../database/models/Usuario");
const Producto = require("../database/models/Producto");
const Cita = require("../database/models/Cita");
const Venta = require("../database/models/Venta");
const Inventario = require("../database/models/Inventario");

const getDashboardSummary = async (req, res) => {
  try {
    const totalUsuarios = await Usuario.count();
    const totalProductos = await Producto.count();
    const totalCitas = await Cita.count();
    const totalVentas = await Venta.count();
    const totalInventario = await Inventario.count();

    sendResponse(res, 200, true, "Resumen del dashboard obtenido", {
      totalUsuarios,
      totalProductos,
      totalCitas,
      totalVentas,
      totalInventario
    });
  } catch (error) {
    console.error("Error obteniendo resumen:", error);
    sendResponse(res, 500, false, "Error interno del servidor");
  }
};

module.exports = { getDashboardSummary };
