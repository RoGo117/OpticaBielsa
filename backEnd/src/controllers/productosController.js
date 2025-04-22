const productoService = require("../services/productosService");

const getProductos = async (req, res) => {
  try {
    const productos = await productoService.getAllProductos();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

const addProducto = async (req, res) => {
  try {
    const id = await productoService.createProducto(req.body);
    res.status(201).json({ message: "Producto creado", id });
  } catch (err) {
    res.status(400).json({ error: "Datos inválidos o incompletos" });
  }
};

const updateProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const actualizado = await productoService.updateProducto(id, req.body);
    res.json({ message: "Producto actualizado", actualizado });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
  getProductos,
  addProducto,
  updateProducto
};
