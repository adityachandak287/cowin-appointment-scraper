const environment = require("../environment");
const axios = require("axios");
const fs = require("fs");
const { getDateTimeString } = require("../utils");

const getFieldBlock = (text, options = {}) => {
  return `\n${text}`;
};
const getSessionVaccineHeaderBlocks = () => {
  return `\n:alarm_clock: *Sessions*\n`;
};

const createBlocks = (data) => {
  const blocks = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `:information_source: New appointments available as of ${getDateTimeString()} :information_source:`,
        emoji: true,
      },
    },
  ];

  data.forEach((center) => {
    const centerBlock = {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "",
      },
    };

    centerBlock.text.text += getFieldBlock(
      `*:round_pushpin: ${center.name}* \t\t ${center.district_name} ${center.pincode}, ${center.state_name}`
    );

    centerBlock.text.text += getSessionVaccineHeaderBlocks();

    center.sessions.forEach((session) => {
      centerBlock.text.text += getFieldBlock(
        `${session.date} - *${session.available_capacity} available* [${
          session.min_age_limit
        }+] ${session.vaccine ? "- " + session.vaccine : ""}`
      );
    });

    blocks.push({
      type: "divider",
    });

    blocks.push(centerBlock);
  });

  return blocks;
};

const sendSlackNotification = async (data) => {
  const blocks = createBlocks(data);
  if (environment.OUTPUT_FILES === "true") {
    fs.writeFileSync("data/blocks.json", JSON.stringify(blocks, null, 2));
  }
  try {
    await axios.post(environment.SLACK_HOOK_URL, { blocks });
  } catch (slackError) {
    console.log(slackError.toString());
    throw new Error("[SLACK] Error while sending notification");
  }
};

module.exports = { sendSlackNotification };
