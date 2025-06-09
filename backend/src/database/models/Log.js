const sequelize = require("../db");
const { Model, DataTypes } = require("sequelize");

class Log extends Model {}

Log.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
    },
    accion: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "logs",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Log;
