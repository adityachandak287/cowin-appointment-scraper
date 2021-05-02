const fs = require("fs");

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

const fetchFromAPI = async () => {
  return null;
};

const fetchData = async () => {
  try {
    const environment = process.env.NODE_ENV || "prod"; // env | prod
    switch (environment) {
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
