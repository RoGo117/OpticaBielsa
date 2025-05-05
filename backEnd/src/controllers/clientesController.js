const clienteService = require("../services/clientesService");

const getClientes = async (req, res) => {
  try {
    const clientes = await clienteService.getAllClientes();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener clientes" });
  }
};

const addCliente = async (req, res) => {
  try {
    const id = await clienteService.createCliente(req.body);
    res.status(201).json({ message: "Cliente creado", id });
  } catch (err) {
    res.status(400).json({ error: "Datos inválidos" });
  }
};

const updateCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const actualizado = await clienteService.updateCliente(id, req.body);
    res.json({ message: "Cliente actualizado", actualizado });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const deleteCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const eliminado = await clienteService.deleteCliente(id);
    if (eliminado) {
      res.json({ message: "Cliente eliminado" });
    } else {
      res.status(404).json({ error: "Cliente no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar cliente" });
  }
};

module.exports = {
  getClientes,
  addCliente,
  updateCliente,
  deleteCliente
};
