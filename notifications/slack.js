const environment = require("../environment");
const axios = require("axios");
const fs = require("fs");

const getFieldBlock = (text, options = {}) => {
  return `\n${text}`;
  return {
    type: "mrkdwn",
    text: text,
    ...options,
  };
};

const getCenterSessionDividerBlocks = () => {
  return "\n----\n";
  return [
    {
      type: "mrkdwn",
      text: "\n--",
    },
    {
      type: "mrkdwn",
      text: "\n",
    },
  ];
};

const getSessionVaccineHeaderBlocks = () => {
  return `\n:alarm_clock: *Sessions*\n`;
  return [
    {
      type: "mrkdwn",
      text: "\n*Sessions* :alarm_clock:",
    },
    {
      type: "mrkdwn",
      text: "\n*Vaccine* :syringe:",
    },
  ];
};

const createBlocks = (data) => {
  const blocks = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `:information_source: New appointments available as of ${new Date().toLocaleString()} :information_source:`,
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
    // centerBlock.text.text += getCenterSessionDividerBlocks();
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
  if (environment.OUTPUT_FILES) {
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
