const { RichEmbed } = require("discord.js");
const { m } = require("../../botconfig.json");
const { cyan } = require("../../colours.json");

function processChance(num, msg) {
  var outnum = Math.round(Math.random() * num);
  var embed = new RichEmbed()
    .setColor(cyan)
    .setAuthor("Dice Roll")
    .addField("Your Roll", outnum, true)
    .addField("Maximum", num, true);
  msg.channel.send(embed);
}

module.exports = {
  config: {
    name: "dice",
    aliases: ["roll"],
    usage: "(option)",
    category: "miscellaneous",
    description: "Rolls different dice. No explanation needed.",
    accessibleby: m.basic
  },

  run: async (bot, message, args) => {
    if (!args[0]) {
      processChance(6, message);
    } else if (args[0].startsWith("d")) {
      processChance(args[0].substr(1), message);
    } else if (!isNaN(args[0])) {
      processChance(args[0], message);
    } else {
      message.delete(500);
      message
        .reply(
          "That doesn't look right... Try again or use ``;help dice`` for the correct comand usage."
        )
        .then(m => m.delete(5000));
    }
  }
};
