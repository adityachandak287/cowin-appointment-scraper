require("dotenv").config();

const environment = {
  CALENDAR_BY_DISTRICT_BASE_URL:
    "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict",
  FEE_TYPE: process.env.FEE_TYPE || "Free,Paid",
  MIN_AGE_LIMIT: process.env.MIN_AGE_LIMIT ? +process.env.MIN_AGE_LIMIT : 18,
  NODE_ENV: process.env.NODE_ENV || "prod",
  SLACK_HOOK_URL: process.env.SLACK_HOOK_URL,
  DISTRICT_ID: process.env.DISTRICT_ID || "395",
  OUTPUT_FILES: process.env.OUTPUT_FILES,
  CHECK_WEEKS: +process.env.CHECK_WEEKS,
};

module.exports = environment;
