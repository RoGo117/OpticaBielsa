const usuariosService = require("../services/usuariosService");

const getUsuarios = async (req, res) => {
  try {
    const usuarios = await usuariosService.getAllUsuarios();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

const addUsuario = async (req, res) => {
  try {
    const id = await usuariosService.createUsuario(req.body);
    res.status(201).json({ message: "Usuario creado", id });
  } catch (err) {
    res.status(400).json({ error: "Datos inválidos" });
  }
};

const updateUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const actualizado = await usuariosService.updateUsuario(id, req.body);
    res.json({ message: "Usuario actualizado", actualizado });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const deleteUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const eliminado = await usuariosService.deleteUsuario(id);
    if (eliminado) {
      res.json({ message: "Usuario eliminado" });
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};

module.exports = {
  getUsuarios,
  addUsuario,
  updateUsuario,
  deleteUsuario
};
