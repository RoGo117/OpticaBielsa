const ventasService = require("../services/ventasService");
const { sendResponse } = require("../utils/helpers");
const logger = require("../utils/logger");
const ExcelJS = require("exceljs");

const getVentas = async (req, res) => {
  try {
    const ventas = await ventasService.getAllVentas();
    sendResponse(res, 200, true, "Ventas obtenidas exitosamente", ventas);
  } catch (error) {
    logger.error(`Error obteniendo ventas: ${error.message}`);
    sendResponse(res, 500, false, "Error interno del servidor");
  }
};

const getVentaById = async (req, res) => {
  try {
    const { id } = req.params;
    const venta = await ventasService.getVentaById(id);
    if (!venta) {
      return sendResponse(res, 404, false, "Venta no encontrada");
    }
    sendResponse(res, 200, true, "Venta obtenida exitosamente", venta);
  } catch (error) {
    logger.error(`Error obteniendo venta: ${error.message}`);
    sendResponse(res, 500, false, "Error interno del servidor");
  }
};

const createVenta = async (req, res) => {
  try {
    const ventaId = await ventasService.createVenta(req.body);
    sendResponse(res, 201, true, "Venta creada exitosamente", { id: ventaId });
  } catch (error) {
    logger.error(`Error creando venta: ${error.message}`);
    sendResponse(res, 500, false, "Error interno del servidor");
  }
};

const updateVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await ventasService.updateVenta(id, req.body);
    if (!updated) {
      return sendResponse(res, 404, false, "Venta no encontrada o sin cambios");
    }
    sendResponse(res, 200, true, "Venta actualizada exitosamente");
  } catch (error) {
    logger.error(`Error actualizando venta: ${error.message}`);
    sendResponse(res, 500, false, "Error interno del servidor");
  }
};

const deleteVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ventasService.deleteVenta(id);
    if (!deleted) {
      return sendResponse(res, 404, false, "Venta no encontrada");
    }
    sendResponse(res, 200, true, "Venta eliminada exitosamente");
  } catch (error) {
    logger.error(`Error eliminando venta: ${error.message}`);
    sendResponse(res, 500, false, "Error interno del servidor");
  }
};

const filterVentas = async (req, res) => {
  try {
    const { fechaInicio, fechaFin, estado } = req.query;
    const ventas = await ventasService.getVentasFiltradas({ fechaInicio, fechaFin, estado });
    sendResponse(res, 200, true, "Ventas filtradas exitosamente", ventas);
  } catch (error) {
    logger.error(`Error filtrando ventas: ${error.message}`);
    sendResponse(res, 500, false, "Error interno del servidor");
  }
};

const getTotalVendido = async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.query;
    if (!fechaInicio || !fechaFin) {
      return sendResponse(res, 400, false, "Faltan fechas");
    }
    const total = await ventasService.getTotalVendido(fechaInicio, fechaFin);
    sendResponse(res, 200, true, "Total vendido obtenido exitosamente", { total });
  } catch (error) {
    logger.error(`Error obteniendo total vendido: ${error.message}`);
    sendResponse(res, 500, false, "Error interno del servidor");
  }
};

const exportarVentas = async (req, res) => {
  try {
    const ventas = await ventasService.getAllVentas();

    // Crear un workbook y una hoja
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Ventas");

    // Agregar encabezados
    worksheet.columns = [
      { header: "ID Venta", key: "id", width: 10 },
      { header: "Cliente", key: "cliente", width: 30 },
      { header: "Total (€)", key: "total", width: 15 },
      { header: "Estado", key: "estado", width: 15 },
      { header: "Fecha", key: "fecha", width: 20 },
    ];

    // Agregar filas
    ventas.forEach((venta) => {
      worksheet.addRow({
        id: venta.id,
        cliente: venta.cliente ? venta.cliente.nombre : `ID: ${venta.cliente_id}`,
        total: venta.total,
        estado: venta.estado,
        fecha: new Date(venta.fecha).toLocaleDateString(),
      });
    });

    // Generar archivo y enviarlo
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=ventas.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error exportando ventas:", error);
    res.status(500).json({ success: false, message: "Error exportando ventas" });
  }
};

module.exports = {
  getVentas,
  getVentaById,
  createVenta,
  updateVenta,
  deleteVenta,
  filterVentas,
  getTotalVendido,
  exportarVentas,
};
