"use strict";
const {
  Model,
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrdenVenta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrdenVenta.hasMany(models.DetalleOrdenVta, {
        foreignKey: "NroOrdenVta",
      });
    }
  }
  OrdenVenta.init({
    fechaEmision: DataTypes.DATE,
    Motivo: DataTypes.STRING,
    Situacion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "OrdenVenta",
  });
  return OrdenVenta;
};
