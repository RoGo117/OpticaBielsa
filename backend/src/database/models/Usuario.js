const sequelize = require("../db");
const { Model, DataTypes } = require("sequelize");

class Usuario extends Model {}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    telefono: {
      type: DataTypes.STRING(20),
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.ENUM("admin", "cliente", "empleado"),
      defaultValue: "cliente",
    },
  },
  {
    sequelize,
    modelName: "usuarios",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Usuario;
