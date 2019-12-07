const fs = require("fs");
const moment = require("moment");
const { RichEmbed } = require("discord.js");
const { m } = require("../../botconfig.json");

module.exports = {
  config: {
    name: "daily",
    aliases: [],
    usage: "",
    category: "economy",
    description: "Claim your Daily Reward [Experimental]",
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
      userData[sender.id].lastDaily = "Not Yet Claimed";
    }

    // Save Changes
    fs.writeFile("db/userdata.json", JSON.stringify(userData), err => {
      if (err) console.error(err);
    });

    var cancollect = false;
    let ld = userData[sender.id].lastDaily;

    if (ld != moment().format("L")) {
      userData[sender.id].lastDaily = moment().format("L");
      userData[sender.id].money += 500;
      message.channel.send({
        embed: {
          title: "Bank",
          color: 0xf1c40f,
          description:
            "You Claimed your Daily reward.\n`500₪` has been added to your account."
        }
      });
    } else {
      message.channel.send({
        embed: {
          title: "Bank",
          color: 0xf94343,
          description:
            "You already claimed your reward.\nCheck back " +
            moment()
              .endOf("day")
              .fromNow()
        }
      });
    }
    // Save Changes
    fs.writeFile("db/userdata.json", JSON.stringify(userData), err => {
      if (err) console.error(err);
    });
  }
};
