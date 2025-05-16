"use strict";
const {
  Model,
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DetalleOrdenCompra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DetalleOrdenCompra.belongsTo(models.OrdenCompra, {
        foreignKey: "NroOrdenC",
      });
      DetalleOrdenCompra.belongsTo(models.Medicamento, {
        foreignKey: "CodMedicamento",
      });
    }
  }
  DetalleOrdenCompra.init({
    NroOrdenC: DataTypes.INTEGER,
    CodMedicamento: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    cantidad: DataTypes.INTEGER,
    precio: DataTypes.DECIMAL,
    montouni: DataTypes.DECIMAL,
  }, {
    sequelize,
    modelName: "DetalleOrdenCompra",
  });
  return DetalleOrdenCompra;
};
