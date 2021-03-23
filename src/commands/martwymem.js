const fs = require("fs");
module.exports = {
  args: true,
  name: "martwymem",
  description:
    "Dodawanie memów",
  execute(message, args) {
    let memes = fs
      .readFileSync("./src/commands/memy.txt", "utf8")
      .split(/\r\n/g);
    console.log(memes);
    if (args[0] === "dodaj") {
      if (!args[1]) return message.channel.send("No ale co dodać");
      memes.push(args[1]);
      fs.appendFileSync("./src/commands/memy.txt", `\r\n${args[1]}`);
      message.channel.send(`Dodano ${args[1]}!`);
      return;
    } else if (args[0] === "usun") {
      if (!args[1]) return message.channel.send("No ale co usunąć");
      memes = memes.filter((mem) => args[1] !== mem);
      fs.writeFileSync("./src/commands/memy.txt", memes.join("\r\n"));
      message.channel.send(`Usunięto ${args[1]}`);
    } else if (args[0] === "pobierz") {
      const memeOfTheDay =
        memes[Math.floor(Math.random() * Math.floor(memes.length))];
      console.log(memeOfTheDay);
      return memeOfTheDay;
    } else {
      return message.channel.send("Incorrect argument");
    }
  },
};
