// controllers/inventarioController.js
const Inventario = require("../database/models/Inventario");
const Producto = require("../database/models/Producto");
const { sendResponse } = require("../utils/helpers");

const getInventario = async (req, res) => {
  try {
    const inventario = await Inventario.findAll({
      include: {
        model: Producto,
        as: "producto",
        attributes: ["id", "nombre", "categoria", "marca"]
      },
      order: [["fecha", "DESC"]]
    });
    sendResponse(res, 200, true, "Inventario obtenido exitosamente", inventario);
  } catch (error) {
    console.error("Error obteniendo inventario:", error);
    sendResponse(res, 500, false, "Error interno del servidor");
  }
};

const createMovimiento = async (req, res) => {
  try {
    const { producto_id, tipo, cantidad } = req.body;
    if (!producto_id || !tipo || !cantidad) {
      return sendResponse(res, 400, false, "Faltan datos requeridos");
    }

    const movimiento = await Inventario.create({ producto_id, tipo, cantidad });
    sendResponse(res, 201, true, "Movimiento registrado exitosamente", movimiento);
  } catch (error) {
    console.error("Error creando movimiento:", error);
    sendResponse(res, 500, false, "Error interno del servidor");
  }
};

module.exports = { getInventario, createMovimiento };
