"use strict";
const {
  Model,
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Medicamento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Medicamento.belongsTo(models.TipoMedic, {
        foreignKey: "CodTipoMed",
      });
      Medicamento.belongsTo(models.Especialidad, {
        foreignKey: "CodEspec",
      });

      Medicamento.hasMany(models.DetalleOrdenVta, {
        foreignKey: "CodMedicamento",
      });
      Medicamento.hasMany(models.DetalleOrdenCompra, {
        foreignKey: "CodMedicamento",
      });
    }
  }
  Medicamento.init({
    descripcionMed: DataTypes.STRING,
    fechaFabricacion: DataTypes.DATE,
    fechaVencimiento: DataTypes.DATE,
    Presentacion: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    precioVentaUni: DataTypes.DECIMAL,
    precioVentaPres: DataTypes.DECIMAL,
    CodTipoMed: DataTypes.INTEGER,
    Marca: DataTypes.STRING,
    CodEspec: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: "Medicamento",
  });
  return Medicamento;
};
