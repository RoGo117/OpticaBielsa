const categoriaService = require("../services/categoriaService");

const getCategorias = async (req, res) => {
  try {
    const categorias = await categoriaService.getAllCategorias();
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener las categorías" });
  }
};

const addCategoria = async (req, res) => {
  const { nombre } = req.body;
  if (!nombre) return res.status(400).json({ error: "El nombre es obligatorio" });

  try {
    const id = await categoriaService.createCategoria(nombre);
    res.status(201).json({ message: "Categoría creada", id });
  } catch (err) {
    res.status(500).json({ error: "Error al crear la categoría" });
  }
};

const updateCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  if (!nombre) return res.status(400).json({ error: "El nombre es obligatorio" });

  try {
    const updated = await categoriaService.updateCategoria(id, nombre);
    res.json({ message: "Categoría actualizada", updated });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const deleteCategoria = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await categoriaService.deleteCategoria(id);
    if (deleted) {
      res.json({ message: "Categoría eliminada" });
    } else {
      res.status(404).json({ error: "Categoría no encontrada" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar la categoría" });
  }
};

module.exports = {
  getCategorias,
  addCategoria,
  updateCategoria,
  deleteCategoria
};
