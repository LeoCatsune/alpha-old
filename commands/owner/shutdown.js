const { ownerid, m } = require("../../botconfig.json");

module.exports = {
  config: {
    name: "shutdown",
    description: "shuts down the bot!",
    usage: "",
    category: "owner",
    accessibleby: m.owner,
    aliases: ["botstop"]
  },
  run: async (bot, message, args) => {
    if (message.author.id != ownerid)
      return message.channel.send("You Do Not Have Permission To Do That!");

    try {
      await message.channel.send("Bot is shutting down...");
      process.exit();
    } catch (e) {
      message.channel.send(`ERROR: ${e.message}`);
    }
  }
};
