module.exports = {
  name: "covid",
  description: "Test",
  async execute(message, args) {
    const api = require('novelcovid');
    api.settings({
      baseUrl: 'https://corona.lmao.ninja'
    })
    let data = await api.countries({ country: 'poland' });
    message.channel.send(`Faworytka pandemia update!

    **Nowych zakażeń: ${data.todayCases}
    Zmarło: ${data.todayDeaths}
    Wyzdrowiało: ${data.todayRecovered}**

Stay safe!`)

  },
};
