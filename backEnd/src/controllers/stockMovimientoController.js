const service = require("../services/stockMovimientoService");

const getMovimientos = async (req, res) => {
  try {
    const movimientos = await service.getAllMovimientos();
    res.json(movimientos);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener movimientos" });
  }
};

const addMovimiento = async (req, res) => {
  try {
    const nuevo = await service.createMovimiento(req.body);
    res.status(201).json({ message: "Movimiento registrado", movimiento: nuevo });
  } catch (err) {
    res.status(400).json({ error: "Datos inválidos" });
  }
};

const updateMovimiento = async (req, res) => {
  try {
    const actualizado = await service.updateMovimiento(req.params.id, req.body);
    res.json({ message: "Movimiento actualizado", actualizado });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const deleteMovimiento = async (req, res) => {
  try {
    const eliminado = await service.deleteMovimiento(req.params.id);
    if (eliminado) {
      res.json({ message: "Movimiento eliminado" });
    } else {
      res.status(404).json({ error: "Movimiento no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar movimiento" });
  }
};

module.exports = {
  getMovimientos,
  addMovimiento,
  updateMovimiento,
  deleteMovimiento
};
