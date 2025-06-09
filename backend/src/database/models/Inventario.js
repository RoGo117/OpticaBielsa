const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");
const Producto = require("./Producto");

class Inventario extends Model {}

Inventario.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  producto_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM("entrada", "salida"),
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: "inventario",
  timestamps: false,
  freezeTableName: true
});

// Asociación
Inventario.belongsTo(Producto, { foreignKey: "producto_id", as: "producto" });

module.exports = Inventario;
