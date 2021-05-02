const environment = require("./environment");
const fs = require("fs");
const { fetchData } = require("./fetchData");
const { sendNotifications } = require("./notifications");

(async () => {
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

  console.log(filter);

  if (environment.NODE_ENV === "dev") {
    fs.writeFileSync("data/filter.json", JSON.stringify(filter, null, 2));
  }

  if (filter.length > 0) {
    await sendNotifications(filter);
  }
})();
