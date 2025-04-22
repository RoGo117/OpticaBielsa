const sequelize = require("../db");
const { Model, DataTypes } = require("sequelize");

class Categoria extends Model {}

Categoria.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: {
        args: [1, 100],
        msg: "El nombre debe tener entre 1 y 100 caracteres"
      }
    }
  }
}, {
  sequelize,
  modelName: "Categoria",
  tableName: "categorías",
  timestamps: false
});

module.exports = Categoria;
