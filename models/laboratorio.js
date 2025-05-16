"use strict";
const {
  Model,
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Laboratorio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Laboratorio.hasMany(models.OrdenCompra, {
        foreignKey: "CodLab",
      });
    }
  }
  Laboratorio.init({
    razonSocial: DataTypes.STRING,
    direccion: DataTypes.STRING,
    telefono: DataTypes.STRING,
    email: DataTypes.STRING,
    contacto: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "Laboratorio",
  });
  return Laboratorio;
};
