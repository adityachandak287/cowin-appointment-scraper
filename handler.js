"use strict";
const scrapeData = require("./index");
const { getDateTimeString } = require("./utils");

module.exports.checkAppointments = async (event) => {
  try {
    await scrapeData();
    console.log("Function run successfully at ", getDateTimeString(true));
  } catch (err) {
    console.log(err.toString());
    return {
      statusCode: 500,
      error: err.toString(),
    };
  }
};
