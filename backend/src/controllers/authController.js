const authService = require("../services/authService");
const { sendResponse, generateToken } = require("../utils/helpers");
const logger = require("../utils/logger");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.findUserByEmail(email);
    if (!user) {
      return sendResponse(res, 401, false, "Credenciales inválidas");
    }

    const isMatch = await authService.validatePassword(password, user.password_hash);
    if (!isMatch) {
      return sendResponse(res, 401, false, "Credenciales inválidas");
    }

    const token = generateToken({ id: user.id, email: user.email, rol: user.rol });

    logger.info(`Usuario logueado: ${email}`);
    sendResponse(res, 200, true, "Login exitoso", {
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        telefono: user.telefono,
        rol: user.rol,
      },
    });
  } catch (error) {
    logger.error(`Error en login: ${error.message}`);
    sendResponse(res, 500, false, "Error interno del servidor");
  }
};

module.exports = {
  login,
};
