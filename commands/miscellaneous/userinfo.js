const { RichEmbed } = require("discord.js");
const { red_light } = require("../../colours.json");
const { m } = require("../../botconfig.json");

module.exports = {
  config: {
    name: "userinfo",
    description: "Pulls the userinfo of yourself or a user!",
    usage: "<user>",
    category: "miscellaneous",
    accessibleby: m.basic,
    aliases: ["ui"]
  },
  run: async (bot, message, args) => {
    if(!args[0]) {
        var userdata = message.author
    } else {
        if(!isNaN(args[0])) {
            var userdata = bot.users.get(args[0])
        } else {
            var userdata =  message.mentions.members.first().user
        }
    }

    if(!userdata) { return message.channel.send("Something doesn't look right... try again.")}

    let uEmbed = new RichEmbed()
      .setColor(red_light)
      .setTitle("User Info")
      .setThumbnail(message.guild.iconURL)
      .setAuthor(
        `${userdata.username} Info`,
        userdata.displayAvatarURL
      )
      .addField("**Username:**", `${userdata.username}`, true)
      .addField("**Discriminator:**", `${userdata.discriminator}`, true)
      .addField("**ID:**", `${userdata.id}`, true)
      .addField("**Status:**", `${userdata.presence.status}`, true)
      .addField("**Created At:**", `${userdata.createdAt}`, true)
      .setFooter(`Alpha`, bot.user.displayAvatarURL);

    message.channel.send(uEmbed);
  }
};
