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

const getISTDateTime = (date = new Date(), offset = 5.5) => {
  const dateUTC = date.getTime() + date.getTimezoneOffset() * 60000;

  const dateIST = new Date(dateUTC + 3600000 * offset);

  return dateIST;
};

module.exports = { getDateTimeString, getISTDateTime };
