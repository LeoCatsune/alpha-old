const { RichEmbed } = require("discord.js");
const { redlight } = require("../../colours.json");
const { m, logchannel } = require("../../botconfig.json");

module.exports = {
  config: {
    name: "softban",
    description: "Softbans a user from the guild!",
    usage: "<user> (reason)",
    category: "moderation",
    accessibleby: m.admin,
    aliases: ["sb", "sbanish", "sremove"],
  },
  run: async (bot, message, args) => {
    if (!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"]))
      return message.channel.send(
        "You do not have permission to perform this command!"
      );

    let banMember =
      message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!banMember)
      return message.channel.send("Please provide a user to ban!");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given!";

    if (!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"]))
      return message.channel.send(
        "I dont have permission to perform this command"
      );

    banMember
      .send(
        `You have been banned from **${message.guild.name}** for: **${reason}**`
      )
      .then(() => message.guild.ban(banMember, { days: 1, reason: reason }))
      .then(() => message.guild.unban(banMember.id, { reason: "Softban" }))
      .catch((err) => console.log(err));

    message.channel
      .send(`**${banMember.user.tag}** has been banned`)
      .then((m) => m.delete(5000));

    let embed = new RichEmbed()
      .setColor(redlight)
      .setAuthor(`${bot.user.username} logs`, message.guild.iconURL)
      .addField("Moderation:", "ban")
      .addField("User:", banMember.user.username)
      .addField("Moderator:", message.author.username)
      .addField("Reason:", reason)
      .addField("Date:", message.createdAt.toLocaleString());

    let sChannel = message.guild.channels.find((c) => c.name === logchannel);
    sChannel.send(embed);
  },
};
