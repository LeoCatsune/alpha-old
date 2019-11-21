const { prefix } = require("../../botconfig.json");

module.exports = async bot => {
  console.log(`Now online in ${bot.guilds.size} servers.`);
  // bot.user.setActivity("Hello", {type: "STREAMING", url:"https://twitch.tv/Strandable"});
  if (bot.guilds.size > 1) {
    var S = "s";
  } else {
    var S = "";
  }

  let statuses = [
    `${bot.guilds.size} server${S}!`,
    `${prefix}help`,
    `over ${bot.users.size} users!`
  ];

  var status = 0;

  setInterval(function() {
    /*let status = statuses[Math.floor(Math.random() * statuses.length)];*/

    // Cycle through statuses, instead of randomly selecting.
    status++;

    // Ensure that it doesn't overflow the end of the array before submitting.
    if (status >= statuses.length) {
      status = 0;
    }

    // Send status to Discord
    bot.user.setActivity(statuses[status], { type: "WATCHING" });
  }, 5000);
};
