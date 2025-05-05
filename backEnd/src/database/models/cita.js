const sequelize = require("../db");
const { Model, DataTypes } = require("sequelize");

class Cita extends Model {}

Cita.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cliente_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_hora: {
    type: DataTypes.DATE,
    allowNull: false
  },
  motivo: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  estado: {
    type: DataTypes.ENUM("pendiente", "completada", "cancelada"),
    defaultValue: "pendiente"
  }
}, {
  sequelize,
  modelName: "Cita",
  tableName: "citas",
  timestamps: false
});

module.exports = Cita;
