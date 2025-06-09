const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Producto extends Model {}

Producto.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  categoria: {
    type: DataTypes.STRING(100)
  },
  marca: {
    type: DataTypes.STRING(100)
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  imagen_url: {
    type: DataTypes.STRING(255)
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  sequelize,
  modelName: "productos",
  timestamps: false,
  freezeTableName: true
});

module.exports = Producto;
