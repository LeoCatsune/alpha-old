const { RichEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const fetch = require("node-fetch");
const { m } = require("../../botconfig.json");

module.exports = {
  config: {
    name: "bird",
    description: "Sends a picture of a bird!",
    usage: "",
    category: "images",
    accessibleby: m.basic,
    aliases: ["birb"]
  },
  run: async (bot, message, args) => {
    let msg = await message.channel.send("Please Wait...");

    fetch("https://some-random-api.ml/img/birb")
      .then(res => res.json())
      .then(body => {
        if (!body) return message.reply("Something went wrong, try again!");

        let embed = new RichEmbed()
          .setColor(cyan)
          .setAuthor(`${bot.user.username} birds!`, message.guild.iconURL)
          .setImage(body.link)
          .setTimestamp()
          .setFooter(
            bot.user.username.toUpperCase(),
            bot.user.displayAvatarURL
          );

        msg.edit(embed);
      });
  }
};
