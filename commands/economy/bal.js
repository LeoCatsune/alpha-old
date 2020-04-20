const fs = require("fs");
const moment = require("moment");
const { RichEmbed } = require("discord.js");
const { m, currencyname } = require("../../botconfig.json");

module.exports = {
  config: {
    name: "bal",
    aliases: ["balance", "bank"],
    usage: "",
    category: "economy",
    description: "Gets your current bot balance [Experimental]",
    accessibleby: m.basic
  },

  run: async (bot, message, args) => {
    let userData = JSON.parse(fs.readFileSync("db/userdata.json", "utf8"));

    let sender = message.author;

    // Events
    if (!userData[sender.id]) {
      userData[sender.id] = {};
    }
    if (!userData[sender.id].money) {
      userData[sender.id].money = 1000;
    }
    if (!userData[sender.id].lastDaily) {
      userData[sender.id].lastDaily = "";
    }

    // Save Changes
    fs.writeFile("db/userdata.json", JSON.stringify(userData), err => {
      if (err) console.error(err);
    });

    message.channel.send({
      embed: {
        title: "Bank",
        color: 0xf1c40f,
        fields: [
          {
            name: "Account Holder",
            value: `${sender.username}`,
            inline: true
          },
          {
            name: "Balance",
            value: userData[sender.id].money + currencyname,
            inline: true
          }
        ]
      }
    });
  }
};
