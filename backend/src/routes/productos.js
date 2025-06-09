const express = require("express");
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductImage } = require("../controllers/productosController");
const { auth } = require("../middleware/auth");
const { isAdmin } = require("../middleware/isAdmin");
const multer = require("multer");

// Configura multer para almacenar la imagen en memoria como buffer
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

// Rutas
router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/:id/imagen", getProductImage);

// Rutas protegidas
router.post("/", auth, isAdmin, upload.single("imagen"), createProduct);
router.put("/:id", auth, isAdmin, upload.single("imagen"), updateProduct);
router.delete("/:id", auth, isAdmin, deleteProduct);

module.exports = router;
