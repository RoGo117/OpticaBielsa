const sequelize = require("../db");
const { Model, DataTypes } = require("sequelize");

class Usuario extends Model {}

Usuario.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  contraseña: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  rol: {
    type: DataTypes.ENUM("admin", "trabajador"),
    defaultValue: "trabajador"
  }
}, {
  sequelize,
  modelName: "Usuario",
  tableName: "usuarios",
  timestamps: false
});

module.exports = Usuario;
