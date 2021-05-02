const environment = require("../environment");
const axios = require("axios");

const getFieldBlock = (text, options = {}) => {
  return {
    type: "mrkdwn",
    text: text,
    ...options,
  };
};

const getCenterSessionDividerBlocks = () => {
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
        text: `:tada: New appointments available as of ${new Date().toLocaleString()}`,
        emoji: true,
      },
    },
  ];

  data.forEach((center) => {
    const centerBlock = {
      type: "section",
      fields: [],
    };
    centerBlock.fields.push(getFieldBlock(`*${center.name}*`));
    centerBlock.fields.push(
      getFieldBlock(
        `${center.district_name} ${center.pincode}, ${center.state_name}`
      )
    );
    centerBlock.fields.push(...getCenterSessionDividerBlocks());
    centerBlock.fields.push(...getSessionVaccineHeaderBlocks());

    center.sessions.forEach((session) => {
      centerBlock.fields.push(
        getFieldBlock(
          `${session.date} - *${session.available_capacity} available*`
        )
      );
      centerBlock.fields.push(getFieldBlock(session.vaccine || "-"));
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
  try {
    await axios.post(environment.SLACK_HOOK_URL, { blocks });
  } catch (slackError) {
    console.log(slackError.toString());
    throw new Error("[SLACK] Error while sending notification");
  }
};

module.exports = { sendSlackNotification };
