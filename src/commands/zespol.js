module.exports = {
  name: "zespol",
  aliases: ["grazyna", "grazynka", "portofolio"],
  description:
    "grazynka be like",
  execute(message, args) {
    [1, 2, 3].forEach(async () => {
      await message.channel.send(
        "w moich oczach jawicie się jako zespół. jesteście zespołem i to dużym. jesteście bardzo dobrą kreatywną grupą."
      );
    });
  },
};
