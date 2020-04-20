const { RichEmbed } = require("discord.js");
const { redlight } = require("../../colours.json");
const { m, logchannel } = require("../../botconfig.json");

module.exports = {
  config: {
    name: "kick",
    description: "Kick a user from the guild!",
    usage: "<user> (reason)",
    category: "moderation",
    accessibleby: m.mod,
    aliases: ["k"],
  },
  run: async (bot, message, args) => {
    if (!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"]))
      return message.channel.send(
        "You dont have permission to perform this command!"
      );

    let kickMember =
      message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!kickMember)
      return message.channel.send("Please provide a user to kick!");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given!";

    if (!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"]))
      return message.channel.send("I dont have permission to do this!");

    kickMember
      .send(
        `You have been kicked from **${message.guild.name}** for: **${reason}**`
      )
      .then(() => kickMember.kick())
      .catch((err) => console.log(err));

    message.channel
      .send(`**${kickMember.user.tag}** has been kicked`)
      .then((m) => m.delete(5000));

    let embed = new RichEmbed()
      .setColor(redlight)
      .setAuthor(`${bot.user.username} logs`, message.guild.iconURL)
      .addField("Moderation:", "kick")
      .addField("User:", kickMember.user.username)
      .addField("Moderator:", message.author.username)
      .addField("Reason:", reason)
      .addField("Date:", message.createdAt.toLocaleString());

    let sChannel = message.guild.channels.find((c) => c.name === logchannel);
    sChannel.send(embed);
  },
};
