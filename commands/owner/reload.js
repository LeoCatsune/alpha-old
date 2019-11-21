const { ownerid, m } = require("../../botconfig.json");
module.exports = {
  config: {
    name: "reload",
    aliases: ["rl"],
    description: "Reload's a command",
    usage: "<command>",
    category: "owner",
    accessibleby: m.owner
  },

  run: async (bot, message, args) => {
    if (message.author.id != ownerid)
      return message.channel.send(`You're not the bot owner.`);
    if (!args[0]) return message.channel.send("Provide a command name.");

    const command =
      bot.commands.get(args[0]) || bot.commands.get(bot.aliases.get(args[0]));
    if (!command)
      return message.channel.send(`The command \`${args[0]}\` wasn't found.`);

    try {
      delete require.cache[
        require.resolve(`../${command.config.category}/${command.config.name}`)
      ];
      bot.commands.delete(command.config.name);
      if (command.config.aliases)
        command.config.aliases.forEach(alias => bot.aliases.delete(alias));
      const pulled = require(`../${command.config.category}/${
        command.config.name
      }`);
      bot.commands.set(pulled.config.name, pulled);
      if (pulled.config.aliases)
        pulled.config.aliases.forEach(alias =>
          bot.aliases.set(alias, pulled.config.name)
        );
    } catch (error) {
      console.error(error);
      return message.channel.send(`Couldn't reload the command \`${args[0]}\``);
    }
    console.log(`[${command.config.name}] Command Reloaded.`);
    return message.channel.send(
      `The command \`${command.config.name}\` has been reloaded!`
    );
  }
};
