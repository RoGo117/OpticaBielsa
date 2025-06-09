const sequelize = require("../db");
const { Model, DataTypes } = require("sequelize");

class VentaProducto extends Model {}

VentaProducto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    venta_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precio_unitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "ventas_productos",
    timestamps: false,
    freezeTableName: true
  }
);

module.exports = VentaProducto;
