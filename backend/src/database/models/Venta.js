const sequelize = require("../db");
const { Model, DataTypes } = require("sequelize");

const Usuario = require("./Usuario");
const VentaProducto = require("./VentaProducto");
class Venta extends Model {}

Venta.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM("pendiente", "pagada", "cancelada"),
      defaultValue: "pendiente",
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "ventas",
    timestamps: false,
    freezeTableName: true,
  }
);


Venta.belongsTo(Usuario, { as: "cliente", foreignKey: "cliente_id" });
Venta.hasMany(VentaProducto, { as: "productosVendidos", foreignKey: "venta_id" });

module.exports = Venta;
