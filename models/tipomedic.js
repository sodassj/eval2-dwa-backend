"use strict";
const {
  Model,
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TipoMedic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TipoMedic.hasMany(models.Medicamento, {
        foreignKey: "CodTipoMed",
      });
    }
  }
  TipoMedic.init({
    descripcion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "TipoMedic",
  });
  return TipoMedic;
};
