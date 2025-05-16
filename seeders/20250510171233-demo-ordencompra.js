"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("OrdenCompras", [
      {
        fechaEmision: new Date(),
        Situacion: "Pendiente",
        Total: 100,
        CodLab: 1,
        NrofacturaProv: "FAC-001",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("OrdenCompras", null, {});
  },
};
