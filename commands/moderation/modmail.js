const { m } = require("../../botconfig.json");
const { aqua } = require("../../colours.json");
const { RichEmbed } = require("discord.js");

module.exports = {
  config: {
    name: "modmail",
    description: "Message the Moderators of your current guild",
    usage: "<message>",
    category: "moderation",
    accessibleBy: m.basic,
    aliases: ["mm", "mail"]
  },
  run: async (bot, message, args) => {
    if (!args[0]) {
      message.delete(5000);
      message.channel
        .send("Please provide a message to send.")
        .then(m => m.delete(5000));
    } else {
      const msg = args.join(" ");

      let embed = new RichEmbed()
        .setColor(aqua)
        .setAuthor(`📫 Mod Mail`)
        .addField("User:", message.author.username)
        .addField("Message:", msg)
        .addField("Date:", message.createdAt.toLocaleString());

      let sChannel = message.guild.channels.find(c => c.name === "mod-mail");
      sChannel.send(embed);

      message.delete(5000);
      message.channel.send("Your message was sent.").then(m => m.delete(5000));
    }
  }
};
