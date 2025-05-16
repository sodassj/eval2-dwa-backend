"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Medicamentos", [
      {
        descripcionMed: "Paracetamol 500mg",
        fechaFabricacion: new Date("2024-01-01"),
        fechaVencimiento: new Date("2026-01-01"),
        Presentacion: "Tabletas",
        stock: 100,
        precioVentaUni: 2,
        precioVentaPres: 10,
        CodTipoMed: 1,
        Marca: "Genérico",
        CodEspec: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descripcionMed: "Amoxicilina 500mg",
        fechaFabricacion: new Date("2024-03-01"),
        fechaVencimiento: new Date("2026-03-01"),
        Presentacion: "Cápsulas",
        stock: 50,
        precioVentaUni: 3,
        precioVentaPres: 12,
        CodTipoMed: 2,
        Marca: "PharmaPlus",
        CodEspec: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Medicamentos", null, {});
  },
};
