"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("TipoMedics", [
      {
        descripcion: "Analgésico",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descripcion: "Antibiótico",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descripcion: "Antiinflamatorio",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("TipoMedics", null, {});
  },
};
