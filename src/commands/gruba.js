module.exports = {
  name: "gruba",
  description: "Stan her",
  async execute(message, args) {
    const fetch = require("node-fetch");
    let url = `https://api.tenor.com/v1/search?q=jihyo&key=${process.env.TENORKEY}&limit=50`;
    let response = await fetch(url);
    let json = await response.json();
    const index = Math.floor(Math.random() * json.results.length);
    message.channel.send(json.results[index].url);
  },
};
