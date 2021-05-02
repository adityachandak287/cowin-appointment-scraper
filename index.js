require("dotenv").config();
const fs = require("fs");
const { fetchData } = require("./fetchData");

(async () => {
  const data = await fetchData();

  const feeTypes = (process.env.FEE_TYPE || "Paid").split(",");

  const filter = data.centers
    .map((center) => {
      if (!feeTypes.includes(center.fee_type)) {
        return null;
      }

      const validSessions = center.sessions.filter((session) => {
        return (
          session.min_age_limit === +process.env.MIN_AGE_LIMIT &&
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

  if (process.env.NODE_ENV === "dev") {
    fs.writeFileSync("data/filter.json", JSON.stringify(filter, null, 2));
  }
})();
