const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productosController");

router.get("/", productosController.getProductos);
router.post("/", productosController.addProducto);
router.put("/:id", productosController.updateProducto);

module.exports = router;
