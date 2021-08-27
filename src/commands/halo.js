module.exports = {
  name: "halo",
  description: "HALO JEST TU KTOŚ?!",
  execute(message, args) {
    message.channel.send(
      "https://cdn.discordapp.com/attachments/644608604959408156/831957507341418576/f3.png"
    );
    message.channel.send(
      Math.random() > 0.5 ? "HALO" : "NIKOGO NIE SŁYSZĘ"
    );
  },
};
//no siema