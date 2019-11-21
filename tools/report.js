const { RichEmbed } = require("discord.js");
const { red_light } = require("../colours.json");
const { trellokey, trellotoken } = require("../botconfig.json");
const Trello = require("trello");
const api = new Trello(trellokey, trellotoken);
const boardID = "5d8b36e62bf2fa147db40739";
const warnlabel = "5d8b36e7183eb73e5c83c083";
const autolabel = "5dc9dc9c4fe26922371a3dea";

module.exports = {
  language: async (bot, message) => {

    console.log(
      `[Automod] Message Detected: (${message.author.tag} > #${message.channel.name}) ${message.content}`
    );

    let embed = new RichEmbed()
      .setColor(red_light)
      .setAuthor(`Message Filter`, message.guild.iconURL)
      .addField("User", message.author.tag)
      .addField("UID", message.author.id)
      .addField("Message", message.content)
      .addField("Channel", `<#${message.channel.id}>`)
      .addField("Date", message.createdAt.toLocaleString())
      .addField("URL", message.url);

    let sChannel = message.guild.channels.find(c => c.name === "bot-logs");
    sChannel.send(embed);
  },
  warn: async (bot, message, args, rsn) => {
    const listID = "5dc78f67a739f80c08f5a64a";
    var curl, cid;

    api
      .addCard(
        `[Warn] ${message.author.tag}`,
        `Username: ${message.author.tag}\nOffense: Bad Language\nMessage: ${message.content}\nInfo: #${message.channel.name}@${message.createdAt}`,
        listID
      )
      .then(card => {
        cid = card.id;
        curl = card.url;
        api.addLabelToCard(cid, warnlabel);
      });

    let embed = new RichEmbed()
      .setColor(red_light)
      .setAuthor(`${bot.user.username} logs`, message.guild.iconURL)
      .addField("Moderation:", "Warn")
      .addField("User:", "")
      .addField("Moderator:", message.author.tag)
      .addField("Reason:", ``)
      .addField("Date:", message.createdAt.toLocaleString())
      .addField("URL:", curl);

    let sChannel = message.guild.channels.find(c => c.name === "bot-logs");
    sChannel.send(embed);
  },
  karen: async (bot, message) => {

    console.log(
      `[Automod] Message MANAGED! (${message.author.tag} > #${message.channel.name}) ${message.content}`
    );

    message.delete();
    message.reply("Watch your language!").then(m => m.delete(3000))

    let embed = new RichEmbed()
      .setColor(red_light)
      .setAuthor(`K4R3N`, message.guild.iconURL)
      .addField("User", message.author.tag)
      .addField("UID", message.author.id)
      .addField("Message", message.content)
      .addField("Channel", `<#${message.channel.id}>`)
      .addField("Date", message.createdAt.toLocaleString());

    let sChannel = message.guild.channels.find(c => c.name === "bot-logs");
    sChannel.send(embed);
  },
};
