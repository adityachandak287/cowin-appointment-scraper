const environment = require("./environment");
const fs = require("fs");
const { default: axios } = require("axios");

const fetchFromFile = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      "./data/sample.json",
      {
        encoding: "utf-8",
      },
      (err, fileRaw) => {
        if (err) reject(err);
        const parsedFile = JSON.parse(fileRaw);
        resolve(parsedFile);
      }
    );
  });
};

const getDateQueryString = (date = new Date()) => {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getUTCFullYear()}`;
};

const addWeeksToDate = (date, numWeeks) => {
  const newDate = new Date(date);
  return new Date(newDate.setDate(newDate.getDate() + numWeeks * 7));
};

const fetchFromAPI = async () => {
  let currDate = new Date();
  const checkDates = [];

  for (let i = 0; i < environment.CHECK_WEEKS; i++) {
    checkDates.push(getDateQueryString(currDate));
    currDate = addWeeksToDate(currDate, 1);
  }

  const districtCodes = environment.DISTRICT_ID.split(",");

  const allData = { centers: [] };

  for await (date of checkDates) {
    for await (districtCode of districtCodes) {
      const API_URL = `${environment.CALENDAR_BY_DISTRICT_BASE_URL}/?district_id=${districtCode}&date=${date}`;
      const { data } = await axios.get(API_URL);
      allData.centers.push(...data.centers);
    }
  }

  return allData;
};

const fetchData = async () => {
  try {
    switch (environment.NODE_ENV) {
      case "dev":
        return await fetchFromFile();
      case "prod":
        return await fetchFromAPI();
      default:
        throw new Error("Default case for switch");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = { fetchData };
