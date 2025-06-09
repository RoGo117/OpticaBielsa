const Venta = require("../database/models/Venta");
const Usuario = require("../database/models/Usuario");

const VentaProducto = require("../database/models/VentaProducto");

async function getAllVentas() {
  return await Venta.findAll({
    include: [
      {
        model: Usuario,
        as: "cliente",
        attributes: ["id", "nombre", "email", "telefono"]
      },
      {
        model: VentaProducto,
        as: "productosVendidos",
        attributes: ["producto_id", "cantidad", "precio_unitario"]
      }
    ]
  });
}

async function getVentasFiltradas({ fechaInicio, fechaFin, estado }) {
  const where = {};
  if (estado) where.estado = estado;
  if (fechaInicio && fechaFin) where.fecha = { [Op.between]: [fechaInicio, fechaFin] };

  return await Venta.findAll({
    where,
    include: [
      { model: Usuario, as: "cliente", attributes: ["id", "nombre", "email", "telefono"] },
      { model: VentaProducto, as: "productosVendidos", attributes: ["producto_id", "cantidad", "precio_unitario"] },
    ],
  });
}

async function getVentaById(id) {
  return await Venta.findByPk(id);
}

async function createVenta(data) {
  const venta = await Venta.create(data);
  return venta.id;
}

async function updateVenta(id, data) {
  const [updated] = await Venta.update(data, { where: { id } });
  return updated;
}

async function deleteVenta(id) {
  const venta = await Venta.findByPk(id);
  if (!venta) return false;
  await venta.destroy();
  return true;
}

async function getTotalVendido({ fechaInicio, fechaFin }) {
  const { Op } = require("sequelize");
  const Venta = require("../database/models/Venta");

  // Agregar la condición para incluir solo ventas pagadas
  const where = {
    estado: "pagada", // solo ventas pagadas
  };

  if (fechaInicio && fechaFin) {
    where.fecha = {
      [Op.between]: [fechaInicio, fechaFin],
    };
  }

  const total = await Venta.sum("total", { where });
  return total || 0;
}

module.exports = {
  getAllVentas,
  getVentaById,
  createVenta,
  updateVenta,
  deleteVenta,
  getVentasFiltradas,
  getTotalVendido,
};
