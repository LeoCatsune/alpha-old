const { RichEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const fetch = require("node-fetch");
const { m } = require("../../botconfig.json");

module.exports = {
  config: {
    name: "cat",
    description: "sends a picture of a cat!",
    usage: "",
    category: "images",
    accessibleby: m.basic,
    aliases: ["catto"]
  },
  run: async (bot, message, args) => {
    let msg = await message.channel.send("Please Wait...");

    fetch("http://aws.random.cat/meow")
      .then(res => res.json())
      .then(body => {
        if (!body) return message.reply("Something went wrong, try again!");

        let embed = new RichEmbed()
          .setColor(cyan)
          .setAuthor(`${bot.user.username} cats!`, message.guild.iconURL)
          .setImage(body.file)
          .setTimestamp()
          .setFooter(
            bot.user.username.toUpperCase(),
            bot.user.displayAvatarURL
          );

        msg.edit(embed);
      });
  }
};
