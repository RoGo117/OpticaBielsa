const usuariosService = require("../services/usuariosService");
const { hashPassword, sendResponse, paginate } = require("../utils/helpers");
const logger = require("../utils/logger");

const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, rol, search } = req.query;
    const { limit: limitNum, offset } = paginate(page, limit);

    const result = await usuariosService.getAllUsers({ rol, search, limit: limitNum, offset });
    sendResponse(res, 200, true, "Usuarios obtenidos exitosamente", result);
  } catch (error) {
    logger.error(`Error obteniendo usuarios: ${error.message}`);
    sendResponse(res, 500, false, "Error interno del servidor");
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user.rol === "cliente" && req.user.id !== Number.parseInt(id)) {
      return sendResponse(res, 403, false, "No tienes permisos para ver este usuario");
    }

    const user = await usuariosService.getUserById(id);
    if (!user) {
      return sendResponse(res, 404, false, "Usuario no encontrado");
    }

    sendResponse(res, 200, true, "Usuario obtenido exitosamente", user);
  } catch (error) {
    logger.error(`Error obteniendo usuario: ${error.message}`);
    sendResponse(res, 500, false, "Error interno del servidor");
  }
};

const createUser = async (req, res) => {
  try {
    const { nombre, email, telefono, rol, password } = req.body;
    const hashedPassword = await hashPassword(password);

    const userId = await usuariosService.createUser({
      nombre,
      email,
      telefono,
      rol,
      password_hash: hashedPassword,
      creado_por: req.user ? req.user.id : null,
    });

    logger.info(`Usuario creado: ${email} por ${req.user ? req.user.email : "registro público"}`);
    sendResponse(res, 201, true, "Usuario creado exitosamente", {
      id: userId,
      nombre,
      email,
      telefono,
      rol,
    });
  } catch (error) {
    logger.error(`Error creando usuario: ${error.message}`);
    sendResponse(res, 500, false, "Error interno del servidor");
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, telefono, rol } = req.body;

    if (req.user.rol !== "admin" && req.user.id !== Number.parseInt(id)) {
      return sendResponse(res, 403, false, "No tienes permisos para actualizar este usuario");
    }

    const updated = await usuariosService.updateUser(id, { nombre, email, telefono, rol, actualizado_por: req.user.id });
    if (!updated) {
      return sendResponse(res, 404, false, "Usuario no encontrado o sin cambios");
    }

    sendResponse(res, 200, true, "Usuario actualizado exitosamente");
  } catch (error) {
    logger.error(`Error actualizando usuario: ${error.message}`);
    sendResponse(res, 500, false, "Error interno del servidor");
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user.id === Number.parseInt(id)) {
      return sendResponse(res, 400, false, "No puedes eliminar tu propio usuario");
    }

    const deleted = await usuariosService.deleteUser(id, req.user.id);
    if (!deleted) {
      return sendResponse(res, 404, false, "Usuario no encontrado");
    }

    logger.info(`Usuario eliminado: ID ${id} por ${req.user.email}`);
    sendResponse(res, 200, true, "Usuario eliminado exitosamente");
  } catch (error) {
    logger.error(`Error eliminando usuario: ${error.message}`);
    sendResponse(res, 500, false, "Error interno del servidor");
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
