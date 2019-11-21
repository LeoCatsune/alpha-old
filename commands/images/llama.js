const { RichEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const fetch = require("node-fetch");
const { m } = require("../../botconfig.json");

module.exports = {
  config: {
    name: "llama",
    description: "Sends a picture of a llama!",
    usage: "",
    category: "images",
    accessibleby: m.basic
  },
  run: async (bot, message, args) => {
    let msg = await message.channel.send("Please wait...");

    fetch("https://apis.duncte123.me/llama")
      .then(res => res.json())
      .then(body => {
        if (!body) return message.reply(" Something went wrong, try again!");

        let embed = new RichEmbed()
          .setColor(cyan)
          .setAuthor(`${bot.user.username} llamas!`, message.guild.iconURL)
          .setImage(body.data.file)
          .setTimestamp()
          .setFooter(
            bot.user.username.toUpperCase(),
            bot.user.displayAvatarURL
          );

        msg.edit(embed);
      });
  }
};
