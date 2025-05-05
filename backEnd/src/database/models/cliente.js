const sequelize = require("../db");
const { Model, DataTypes } = require("sequelize");

class Cliente extends Model {}

Cliente.init({
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
    allowNull: true
  },
  teléfono: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  fecha_registro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: "Cliente",
  tableName: "clientes",
  timestamps: false
});

module.exports = Cliente;
