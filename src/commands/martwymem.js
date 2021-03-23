const fs = require("fs");
module.exports = {
  args: true,
  name: "martwymem",
  description:
    "Dodawanie memów",
  execute(message, args) {
    let memes = fs
      .readFileSync("./src/commands/memy.txt", "utf8")
      .split(/\n/g);
    console.log(memes.length);
    if (args[0] === "dodaj") {
      if (!args[1]) return message.channel.send("No ale co dodać");
      memes.push(args[1]);
      fs.appendFileSync("./src/commands/memy.txt", `\n${args.slice(1).join(' ')}`);
      message.channel.send(`Dodano ${args.slice(1).join(' ')}!`);
      return;
    } else if (args[0] === "usun") {
      if (!args[1]) return message.channel.send("No ale co usunąć");
      memes = memes.filter((mem) => args.slice(1).join(' ') !== mem);
      fs.writeFileSync("./src/commands/memy.txt", memes.join("\n"));
      message.channel.send(`Usunięto ${args.slice(1).join(' ')}`);
    } else if (args[0] === "pobierz") {
      const memeOfTheDay =
        memes[Math.floor(Math.random() * Math.floor(memes.length))];
      console.log(memeOfTheDay);
      return memeOfTheDay;
    } else if (args[0] === "wyswietl") {
        message.channel.send(`\`\`\`${memes.join('\n')}\`\`\``)
    } else {
      return message.channel.send("Incorrect argument");
    }
  },
};
