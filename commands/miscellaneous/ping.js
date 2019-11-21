const { m } = require("../../botconfig.json");

module.exports = {
  config: {
    name: "ping",
    description: "PONG! Displays the api & bot latency",
    usage: "",
    category: "miscellaneous",
    accessibleby: m.basic
  },
  run: async (bot, message, args) => {
    message.channel.send("Please wait...").then(m => {
      let ping = m.createdTimestamp - message.createdTimestamp;
      let choices = [
        "Ping! Here it is",
        "Is it just me, or is time moving slowly?",
        "Please tell me it's not that bad..."
      ];
      let response = choices[Math.floor(Math.random() * choices.length)];

      m.edit(
        `${response}\n Bot Latency: \`${ping}\`, API Latency: \`${Math.round(
          bot.ping
        )}\``
      );
    });
  }
};
