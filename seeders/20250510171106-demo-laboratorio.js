"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Laboratorios", [
      {
        razonSocial: "Laboratorio Bayer",
        direccion: "Av. Industrial 123",
        telefono: "987654321",
        email: "contacto@bayer.com",
        contacto: "Juan Díaz",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        razonSocial: "Laboratorio Roche",
        direccion: "Calle Central 456",
        telefono: "912345678",
        email: "info@roche.com",
        contacto: "María López",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Laboratorios", null, {});
  },
};
