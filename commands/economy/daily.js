const fs = require("fs");
const moment = require("moment");
const { RichEmbed } = require("discord.js");
const { m, currencyname } = require("../../botconfig.json");

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
      userData[sender.id].lastDaily = "";
    }

    // Save Changes
    fs.writeFile("db/userdata.json", JSON.stringify(userData), err => {
      if (err) console.error(err);
    });

    var cancollect = false;
    let ld = userData[sender.id].lastDaily;

    if (ld == "") {
      userData[sender.id].lastDaily = moment()
        .utc()
        .format();
      userData[sender.id].money += 500;
      message.channel.send({
        embed: {
          title: "Bank",
          color: 0xf1c40f,
          description:
            `You Claimed your **first** Daily reward.\n500${currencyname} has been added to your account.`
        }
      });
      // Save Changes
      fs.writeFile("db/userdata.json", JSON.stringify(userData), err => {
        if (err) console.error(err);
      });
      return;
    }

    let nd = moment(ld)
      .add(1, "day")
      .utc()
      .format();
    let ct = moment()
      .utc()
      .format();
    let cr = moment(ct).isSameOrAfter(nd);

    if (cr) {
      userData[sender.id].lastDaily = moment()
        .utc()
        .format();
      userData[sender.id].money += 250;
      message.channel.send({
        embed: {
          title: "Bank",
          color: 0xf1c40f,
          description:
            `You Claimed your Daily reward.\n250${currencyname} has been added to your account.`
        }
      });
    } else {
      message.channel.send({
        embed: {
          title: "Bank",
          color: 0xf94343,
          description:
            "You already claimed your reward.\nCheck back " +
            moment(nd).fromNow()
        }
      });
    }
    // Save Changes
    fs.writeFile("db/userdata.json", JSON.stringify(userData), err => {
      if (err) console.error(err);
    });
  }
};
