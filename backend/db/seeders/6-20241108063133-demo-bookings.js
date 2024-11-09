"use strict";

const { DATE } = require("sequelize");
const { Booking } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const bookings = [
  {
    spotId: 3,
    userId: 2,
    startDate: new DATE("2024-12-17T03:24:00"),
    endDate: new DATE("2024-12-20T03:24:00"),
  },
  {
    spotId: 2,
    userId: 1,
    startDate: new DATE("2024-10-10T03:24:00"),
    endDate: new DATE("2024-10-15T03:24:00"),
  },
  {
    spotId: 1,
    userId: 3,
    startDate: new DATE("2024-12-06T03:24:00"),
    endDate: new DATE("2024-12-10T03:24:00"),
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate(bookings);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, { [Op.or]: bookings });
  },
};
