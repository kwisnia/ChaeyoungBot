module.exports = {
  args: true,
  name: "maranda",
  aliases: ["mirinda", "fanta"],
  description:
    "tak jak powiedziałam już wcześniej, zapraszam na moją specjalizację bo żadne z nas nie jest kierownikiem tego przedmiotu",
  execute(message, args) {
    [1, 2, 3].forEach(async () => {
      await message.channel.send(
        "tak jak powiedziałam już wcześniej, zapraszam na moją specjalizację bo żadne z nas nie jest kierownikiem tego przedmiotu"
      );
    });
  },
};
