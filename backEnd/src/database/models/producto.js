const sequelize = require("../db");
const { Model, DataTypes } = require("sequelize");

class Producto extends Model {}

Producto.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  fecha_agregado: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: "Producto",
  tableName: "productos",
  timestamps: false
});

module.exports = Producto;
