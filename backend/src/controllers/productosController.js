const productosService = require("../services/productosService");
const { sendResponse } = require("../utils/helpers");
const logger = require("../utils/logger");

const getProducts = async (req, res) => {
  try {
    const products = await productosService.getAllProducts();
    sendResponse(res, 200, true, "Productos obtenidos exitosamente", products);
  } catch (error) {
    logger.error(`Error obteniendo productos: ${error.message}`);
    sendResponse(res, 500, false, "Error interno del servidor");
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productosService.getProductById(id);
    if (!product) {
      return sendResponse(res, 404, false, "Producto no encontrado");
    }
    sendResponse(res, 200, true, "Producto obtenido exitosamente", product);
  } catch (error) {
    logger.error(`Error obteniendo producto: ${error.message}`);
    sendResponse(res, 500, false, "Error interno del servidor");
  }
};

const createProduct = async (req, res) => {
  try {
     console.log("BODY:", req.body);
    console.log("FILE:", req.file); 
    const { nombre, categoria, marca, precio, stock, descripcion } = req.body;

    // Validar datos obligatorios
    if (!nombre || !precio) {
      return res.status(400).json({ success: false, message: "Nombre y precio son obligatorios" });
    }
    // Procesar la imagen si se adjunta
    const imagenBuffer = req.file ? req.file.buffer : null;

    const nuevoProducto = {
      nombre,
      categoria,
      marca,
      precio,
      stock,
      activo: true,
      descripcion,
      imagen: imagenBuffer
    };

    await productosService.createProduct(nuevoProducto);

    res.status(201).json({ success: true, message: "Producto creado exitosamente" });
  } catch (error) {
    console.error("Error creando producto:", error);
    res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
};


const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, categoria, marca, precio, stock, imagen_url } = req.body;
    const updated = await productosService.updateProduct(id, { nombre, categoria, marca, precio, stock, imagen_url });
    if (!updated) {
      return sendResponse(res, 404, false, "Producto no encontrado o sin cambios");
    }
    sendResponse(res, 200, true, "Producto actualizado exitosamente");
  } catch (error) {
    logger.error(`Error actualizando producto: ${error.message}`);
    sendResponse(res, 500, false, "Error interno del servidor");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await productosService.deleteProduct(id);
    if (!deleted) {
      return sendResponse(res, 404, false, "Producto no encontrado");
    }
    sendResponse(res, 200, true, "Producto eliminado exitosamente");
  } catch (error) {
    logger.error(`Error eliminando producto: ${error.message}`);
    sendResponse(res, 500, false, "Error interno del servidor");
  }
};

const getProductImage = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await productosService.getProductById(id);

    if (!producto || !producto.imagen) {
      return res.status(404).send("Imagen no encontrada");
    }

    res.setHeader("Content-Type", "image/jpeg");
    res.send(producto.imagen);
  } catch (error) {
    logger.error(`Error obteniendo imagen: ${error.message}`);
    res.status(500).send("Error interno del servidor");
  }
};


module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductImage
};