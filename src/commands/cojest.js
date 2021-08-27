module.exports = {
  name: "cojest",
  aliases: ["co"],
  description: "Co jest kurwa",
  execute(message, args) {
    message.channel.send(
      Math.random() > 0.1
      ? "https://cdn.discordapp.com/attachments/694564497662148679/799684339449200650/unknown.png"
      : "https://cdn.discordapp.com/attachments/791363713969815583/831794515378831370/unknown.png"
    );
  },
};
