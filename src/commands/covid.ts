import { SlashCommandBuilder } from '@discordjs/builders';
import { ICommand } from '../services/interaction/ICommand';
import { fetchCovid } from '../utils/fetchHelpers';

const covid: ICommand = {
  data: new SlashCommandBuilder()
    .setName('covid')
    .setDescription('Informacje o zakażeniach w Polsce z dzisiaj'),
  execute: async (interaction) => {
    const data = await fetchCovid();
    await interaction.reply(`Faworytka pandemia update!

    **Nowych zakażeń: ${data.todayCases}
    Zmarło: ${data.todayDeaths}
    Wyzdrowiało: ${data.todayRecovered}**

Stay safe!`);
  },
};

export default covid;
