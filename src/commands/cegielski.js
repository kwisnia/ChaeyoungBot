var _ = require('underscore');
const callbacks = [
  (string) => (string.toLowerCase()),
  (string) => (string.toUpperCase()),
  (string) => ([...string].map((v,i) => i%2 ? v : v.toUpperCase()).join('')),
  (string) => ([...string].map((v,i) => i%2 ? v.toUpperCase() : v).join('')),
]
module.exports = {
  name: "cegielski",
  aliases: ["cegla", "cegła", "pacz"],
  description: "owszem. tak. mhm.",
  execute(message, args) {
    message.channel.send(
      `- "${(_.sample(callbacks)(_.sample(["tak", "tak?", "tak!"])))}"`
    );
  },
};
