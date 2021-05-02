const { sendSlackNotification } = require("./slack");

const sendNotifications = async (data) => {
  try {
    await sendSlackNotification(data);
  } catch (err) {
    console.log(err.toString());
  }
};

module.exports = { sendNotifications };
