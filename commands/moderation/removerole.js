const { RichEmbed } = require("discord.js");
const { redlight } = require("../../colours.json");
const { m, logchannel } = require("../../botconfig.json");

module.exports = {
  config: {
    name: "removerole",
    description: "Removes a role to a member of the guild!",
    usage: "<user> <role>",
    category: "moderation",
    accessibleby: m.mod,
    aliases: ["rr", "roleremove"],
  },
  run: async (bot, message, args) => {
    if (!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"]))
      return message.channel.send(
        "You dont have permission to perform this command!"
      );

    let rMember =
      message.mentions.members.first() ||
      message.guild.members.find((m) => m.user.tag === args[0]) ||
      message.guild.members.get(args[0]);
    if (!rMember)
      return message.channel.send(
        "Please provide a user to remove a role too."
      );
    let role =
      message.guild.roles.find(
        (r) => r.name.toLowerCase() == args[1].toLowerCase()
      ) ||
      message.guild.roles.find((r) => r.id == args[1]) ||
      message.mentions.roles.first();
    if (!role)
      return message.channel.send(
        "Please provide a role to remove from said user."
      );
    let reason = args.slice(2).join(" ");
    if (!reason) return message.channel.send("Please provide a reason");

    if (!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"]))
      return message.channel.send(
        "I don't have permission to perform this command."
      );

    if (!rMember.roles.has(role.id)) {
      return message.channel.send(
        `${rMember.displayName}, doesnt have the role!`
      );
    } else {
      await rMember.removeRole(role.id).catch((e) => console.log(e.message));
      message.channel.send(
        `The role, ${role.name}, has been removed from ${rMember.displayName}.`
      );
    }

    let embed = new RichEmbed()
      .setColor(redlight)
      .setAuthor(`${bot.user.username} logs`, message.guild.iconURL)
      .addField("Moderation:", "Remove role")
      .addField("User:", rMember.user.username)
      .addField("Moderator:", message.author.username)
      .addField("Reason:", reason)
      .addField("Date:", message.createdAt.toLocaleString());

    let sChannel = message.guild.channels.find((c) => c.name === logchannel);
    sChannel.send(embed);
  },
};
