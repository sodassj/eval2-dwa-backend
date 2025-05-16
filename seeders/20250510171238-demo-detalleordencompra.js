"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("DetalleOrdenCompras", [
      {
        NroOrdenC: 1,
        CodMedicamento: 1,
        descripcion: "Paracetamol 500mg",
        cantidad: 20,
        precio: 2,
        montouni: 40,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("DetalleOrdenCompras", null, {});
  },
};
