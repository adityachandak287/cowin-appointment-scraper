const getDateTimeString = (
  specifyTimezone = false,
  date = new Date(),
  locale = "en-US",
  timeZone = "Asia/Kolkata"
) => {
  return `${date.toLocaleString(locale, {
    timeZone,
  })}${specifyTimezone ? " GMT+0530 IST" : ""}`;
};

module.exports = { getDateTimeString };
