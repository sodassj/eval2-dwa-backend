"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("OrdenVenta", [
      {
        fechaEmision: new Date(),
        Motivo: "Venta al público",
        Situacion: "Pagado",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("OrdenVenta", null, {});
  },
};
