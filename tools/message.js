const { RichEmbed } = require("discord.js");
const { red_light } = require("../colours.json");
const { logchannel } = require("../botconfig.json");

module.exports = {
  warn: async (bot, message, args, rsn) => {
    let embed = new RichEmbed()
      .setColor(red_light)
      .setAuthor(`${bot.user.username} logs`, message.guild.iconURL)
      .addField("Moderation:", "Warn")
      .addField("User:", "")
      .addField("Moderator:", message.author.tag)
      .addField("Reason:", ``)
      .addField("Date:", message.createdAt.toLocaleString());

    let sChannel = message.guild.channels.find((c) => c.name === logchannel);
    sChannel.send(embed);
  },
  automod: async (bot, message, del) => {
    console.log(
      `[Automod] Message Deleted: (${message.author.tag} > #${message.channel.name}) ${message.content}`
    );
    if (del) {
      message.delete();
      message.reply("Watch your language!").then((m) => m.delete(3000));
    }

    let embed = new RichEmbed()
      .setColor(red_light)
      .setAuthor(`Automod`, message.guild.iconURL)
      .addField("User", message.author.tag)
      .addField("UID", message.author.id)
      .addField("Message", message.content)
      .addField("Channel", `<#${message.channel.id}>`)
      .addField("Date", message.createdAt.toLocaleString());

    let sChannel = message.guild.channels.find((c) => c.name === logchannel);
    sChannel.send(embed);
  },
};
