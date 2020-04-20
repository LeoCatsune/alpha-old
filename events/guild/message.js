const { prefix, automod } = require("../../botconfig.json");
const report = require("../../tools/message.js");
const lp = require("leo-profanity");

module.exports = async (bot, message) => {
  if (message.author.bot || message.channel.type === "dm") return;

  if (
    lp.check(message.content) ||
    (lp.check(message.content.replace(/\s/g, "")) && automod.enabled)
  ) {
    report.automod(bot, message, automod.delete);
  }

  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let cmd = args.shift().toLowerCase();

  if (!message.content.startsWith(prefix)) return;
  let commandfile =
    bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
  if (commandfile) commandfile.run(bot, message, args);
};
