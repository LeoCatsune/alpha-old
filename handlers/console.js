module.exports = bot => {
  let prompt = process.openStdin();
  prompt.addListener("data", res => {
    let x = res
      .toString()
      .trim()
      .split(/ +/g);
    bot.channels.get("484201726979604491").send(x.join(" "));
  });
};
