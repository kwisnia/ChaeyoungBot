import { SlashCommandBuilder } from '@discordjs/builders';
import { ICommand } from '../services/interaction/ICommand';

const kpop: ICommand = {
  data: new SlashCommandBuilder()
    .setName('kpop')
    .setDescription('Nie jestem kpopiarą przecież, skąd wogóle taki pomysł'),
  execute: async (interaction) => {
    await interaction.reply(
      'https://cdn.discordapp.com/attachments/694564497662148679/791353450122182666/ikeepwalking1.png',
    );
  },
};

export default kpop;
