"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "SpotImages",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        url: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        spotId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Spots",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        preview: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: new Date(),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: new Date(),
        },
      },
      options
    );
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    await queryInterface.dropTable(options);
  },
};
