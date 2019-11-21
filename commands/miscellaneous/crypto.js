const { RichEmbed } = require("discord.js");
const { m } = require("../../botconfig.json");
const { gold } = require("../../colours.json");
const fetch = require("node-fetch");
const apiURL = "https://api.coincap.io/v2/assets";

function ordinal_suffix_of(i) {
  if (!i) {
    return;
  }
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}

module.exports = {
  config: {
    name: "crypto",
    aliases: ["cc", "coin"],
    usage: "(currency)",
    category: "miscellaneous",
    description:
      "Gets the details of a cryptocurrency. Use the currency's symbol (e.g. LTC) to search.",
    accessibleby: m.basic
  },

  run: async (bot, message, args) => {
    let msg = await message.channel.send("Please Wait...");

    fetch(apiURL).then(res =>
      res.json().then(body => {
        if (!body)
          return message.reply("Whoops. Something went wrong, try again!");

        let coins = body.data;

        if (!args[0]) {
          selcoin = "BTC";
        } else {
          selcoin = args[0].toUpperCase();
        }

        coinList = [];
        for (x in coins) {
          coinList.push(coins[x].symbol);
        }

        if (coinList.indexOf(selcoin) >= 0) {
          scoindata = coins[coinList.indexOf(selcoin)];

          let embed = new RichEmbed()
            .setColor(gold)
            .setAuthor(`[${selcoin}] ${scoindata.name} info`)
            .setFooter(
              "Data from CoinCap | https://www.coincap.io/",
              "https://is4-ssl.mzstatic.com/image/thumb/Purple123/v4/c0/12/de/c012de0d-fdfa-d75c-8b4b-eced63200f8f/AppIcon-0-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-7.png/246x0w.jpg"
            )
            .addField("Rank", ordinal_suffix_of(scoindata.rank), true)
            .addField(
              "Price (USD)",
              `$${parseFloat(scoindata.priceUsd).toFixed(4)}`,
              true
            )
            .addField(
              "% Change (24hrs)",
              `${parseFloat(scoindata.changePercent24Hr).toFixed(4)}%`,
              true
            );
          msg.edit(embed);
        } else {
          msg.edit(`${selcoin} is not a valid currency.`);
        }
      })
    );
  }
};
