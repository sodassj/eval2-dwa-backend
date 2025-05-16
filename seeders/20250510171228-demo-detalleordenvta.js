"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("DetalleOrdenVta", [
      {
        NroOrdenVta: 1,
        CodMedicamento: 2,
        descripcionMed: "Amoxicilina 500mg",
        cantidadRequerida: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("DetalleOrdenVta", null, {});
  },
};
