"use strict";
const {
  Model,
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Especialidad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Especialidad.hasMany(models.Medicamento, {
        foreignKey: "CodEspec",
      });
    }
  }
  Especialidad.init({
    descripcionEsp: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "Especialidad",
    tableName: "Especialidades",
  });
  return Especialidad;
};
