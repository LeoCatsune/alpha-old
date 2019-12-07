const { RichEmbed } = require("discord.js");
const { m } = require("../../botconfig.json");
const { cyan } = require("../../colours.json");
var snl = require("solenolyrics");
const moment = require("moment");

module.exports = {
  config: {
    name: "lyrics",
    aliases: ["lyric", "lyr", "l"],
    usage: "<query>",
    category: "miscellaneous",
    description: "Searches for lyrics.",
    accessibleby: m.basic
  },

  run: async (bot, message, args) => {
    if (!args[0]) return message.reply("Please provide a search query!");

    var verbose = false;
    if (args[0] == "/v" || args[0] == "-v") {
      args.shift();
      verbose = true;
    }

    var req = args.join(" ");

    var msg = await message.channel.send("Please Wait...");

    var qstart = moment()
      .utc()
      .format("x");

    var ttl = await snl.requestTitleFor(req);
    var aut = await snl.requestAuthorFor(req);
    var lyr = await snl.requestLyricsFor(req);
    var img = await snl.requestIconFor(req);

    var qend = moment()
      .utc()
      .format("x");

    var lines = lyr.split("\n");

    var linebuffer = "";
    var blocks = [];

    var msg = await msg.edit("Parsing...");

    for (i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (line == "") {
        if (linebuffer != "") {
          blocks.push(linebuffer);
          linebuffer = "";
        }
      } else {
        linebuffer += line + "\n";
      }
    }

    if (linebuffer != "") {
      blocks.push(linebuffer);
    }

    var outblocks = [];
    linebuffer = "";
    for (i = 0; i < blocks.length; i++) {
      var block = blocks[i];
      if (linebuffer.length + 1 + block.length > 1000) {
        outblocks.push(linebuffer);
        linebuffer = block;
      } else {
        linebuffer += block + "\n";
      }
    }

    if (linebuffer != "") {
      outblocks.push(linebuffer);
    }

    var parseEnd = moment()
      .utc()
      .format("x");

    var embed = new RichEmbed()
      .setAuthor(`${aut}: ${ttl}`, img)
      .setColor(cyan)
      .setImage(img);

    for (i = 0; i < outblocks.length; i++) {
      embed.addField(`[${i + 1}/${outblocks.length}]`, outblocks[i]);
    }

    if (verbose) {
      embed.addField("Query Timestamps", `${qstart} - ${qend}`);
      embed.addField("Parser Timestamps", `${qend} - ${parseEnd}`);
    }

    msg.edit(embed).catch(e => {
      if (verbose == true) {
        msg.edit(
          ":warning: Something went wrong, contact the developer for help. " +
            `\`\`\`${e}\`\`\``
        );
      } else {
        msg.edit(
          ":warning: Something went wrong, contact the developer for help."
        );
      }
    });
  }
};
