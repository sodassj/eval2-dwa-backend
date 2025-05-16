"use strict";
const {
  Model,
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrdenCompra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrdenCompra.belongsTo(models.Laboratorio, {
        foreignKey: "CodLab",
      });
      OrdenCompra.hasMany(models.DetalleOrdenCompra, {
        foreignKey: "NroOrdenC",
      });
    }
  }
  OrdenCompra.init({
    fechaEmision: DataTypes.DATE,
    Situacion: DataTypes.STRING,
    Total: DataTypes.DECIMAL,
    CodLab: DataTypes.INTEGER,
    NrofacturaProv: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "OrdenCompra",
  });
  return OrdenCompra;
};
