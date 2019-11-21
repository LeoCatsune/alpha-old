const { RichEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const { m } = require("../../botconfig.json");

module.exports = {
  config: {
    name: "serverinfo",
    description: "Pulls the serverinfo of the guild!",
    usage: "",
    category: "miscellaneous",
    accessibleby: m.basic,
    aliases: ["si", "serverdesc"]
  },
  run: async (bot, message, args) => {
    let sEmbed = new RichEmbed()
      .setColor(cyan)
      .setTitle("Server Info")
      .setThumbnail(message.guild.iconURL)
      .setAuthor(`${message.guild.name} Info`, "📋")
      .addField("**Guild Name:**", `${message.guild.name}`, true)
      .addField("**Guild Owner:**", `${message.guild.owner}`, true)
      .addField("**Member Count:**", `${message.guild.memberCount}`, true)
      .addField("**Role Count:**", `${message.guild.roles.size}`, true)
      .setFooter(
        `${bot.user.username} | ${message.guild.name}`,
        bot.user.displayAvatarURL
      );
    message.channel.send(sEmbed);
  }
};
