"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Usuarios", [
      {
        nombre: "Administrador",
        email: "admin@farmacia.com",
        password:
          "$2b$10$qMtkxUgxReShpXpT6xRmv.zmqrF7kBHSyxVCv0mHMJ1/yLLiw2C2S",
        rol: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Juan Pérez",
        email: "juan@farmacia.com",
        password:
          "$2b$10$qMtkxUgxReShpXpT6xRmv.zmqrF7kBHSyxVCv0mHMJ1/yLLiw2C2S",
        rol: "usuario",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Usuarios", null, {});
  },
};
