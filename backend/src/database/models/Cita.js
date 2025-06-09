const sequelize = require("../db");
const { Model, DataTypes } = require("sequelize");

class Cita extends Model {}

Cita.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    servicio: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM("programada", "confirmada", "en_curso", "completada", "cancelada"),
      defaultValue: "programada",
    },
  },
  {
    sequelize,
    modelName: "citas",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Cita;
