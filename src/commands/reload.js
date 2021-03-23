const fs = require("fs");
module.exports = {
  name: "reload",
  description: "Reloads a command",
  execute(message, args) {
    if (!args.length)
      return message.channel.send(`Ale podaj no coś, ${message.author}!`);
    const commandName = args[0].toLowerCase();
    const command =
      message.client.commands.get(commandName) ||
      message.client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command)
      return message.channel.send(
        `Przecież tu nikogo o tym aliasie: \`${commandName}\` nie ma, ${message.author}!`
      );
    const commands = fs.readdirSync("./");
    const folderName = commands.find((folder) =>
      commands.includes(`${commandName}.js`)
    );
    delete require.cache[require.resolve(`./${command.name}.js`)];
    try {
      const newCommand = require(`./${command.name}.js`);
      message.client.commands.set(newCommand.name, newCommand);
    } catch (error) {
      console.error(error);
      message.channel.send(
        `There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``
      );
    }
    message.channel.send(`Command \`${command.name}\` was reloaded!`);
  },
};
