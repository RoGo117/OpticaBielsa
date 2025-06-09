const express = require("express");
const {
  getVentas,
  getVentaById,
  createVenta,
  updateVenta,
  deleteVenta,
  filterVentas,
  getTotalVendido,
  exportarVentas,
} = require("../controllers/ventasController");
const { auth } = require("../middleware/auth");
const { isAdmin } = require("../middleware/isAdmin");

const router = express.Router();

router.get("/exportar", auth, isAdmin, exportarVentas);

router.get("/total-vendido", auth, isAdmin, getTotalVendido);

router.get("/filtrar", auth, isAdmin, filterVentas);

router.get("/", auth, isAdmin, getVentas);

router.get("/:id", auth, isAdmin, getVentaById);

router.post("/", auth, isAdmin, createVenta);

router.put("/:id", auth, isAdmin, updateVenta);

router.delete("/:id", auth, isAdmin, deleteVenta);

module.exports = router;
