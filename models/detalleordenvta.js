"use strict";
const {
  Model,
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DetalleOrdenVta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DetalleOrdenVta.belongsTo(models.OrdenVenta, {
        foreignKey: "NroOrdenVta",
      });
      DetalleOrdenVta.belongsTo(models.Medicamento, {
        foreignKey: "CodMedicamento",
      });
    }
  }
  DetalleOrdenVta.init({
    NroOrdenVta: DataTypes.INTEGER,
    CodMedicamento: DataTypes.INTEGER,
    descripcionMed: DataTypes.STRING,
    cantidadRequerida: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: "DetalleOrdenVta",
  });
  return DetalleOrdenVta;
};
