const { m } = require("../../botconfig.json");
const { RichEmbed } = require("discord.js");
const iq = require("inspirational-quotes");

module.exports = {
  config: {
    name: "quote",
    description: "Gets a random quote.",
    usage: "",
    category: "miscellaneous",
    accessibleby: m.basic
  },
  run: async (bot, message, args) => {
    let quote = iq.getQuote();
    var author = quote.author;
    var text = quote.text;

    let embed = new RichEmbed()
      .setAuthor(`${bot.user.username} quotes`, message.guild.iconURL)
      .addField("Author", author)
      .addField("Quote", text)
      .setFooter("Quotes Via NPM: 'inspirational-quotes'");
    message.channel.send(embed);
  }
};
