const environment = require("./environment");
const fs = require("fs");
const { fetchData } = require("./fetchData");
const { sendNotifications } = require("./notifications");

const scrapeData = async () => {
  const data = await fetchData();

  const feeTypes = environment.FEE_TYPE.split(",");

  const filter = data.centers
    .map((center) => {
      if (!feeTypes.includes(center.fee_type)) {
        return null;
      }

      const validSessions = center.sessions.filter((session) => {
        return (
          session.min_age_limit === environment.MIN_AGE_LIMIT &&
          session.available_capacity > 0
        );
      });

      if (validSessions.length === 0) {
        return null;
      }
      center.sessions = validSessions;
      return center;
    })
    .filter((center) => center);

  if (environment.OUTPUT_FILES === "true") {
    fs.writeFileSync("data/filter.json", JSON.stringify(filter, null, 2));
  }

  console.log(`${filter.length} centers match criteria.`);

  if (filter.length > 0) {
    await sendNotifications(filter);
  }
};

module.exports = scrapeData;

if (require.main === module) {
  (async () => {
    await scrapeData();
  })();
}
