"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Especialidades", [
      {
        descripcionEsp: "Cardiología",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descripcionEsp: "Pediatría",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descripcionEsp: "Dermatología",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Especialidades", null, {});
  },
};
