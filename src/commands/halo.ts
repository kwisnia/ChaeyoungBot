import { SlashCommandBuilder } from '@discordjs/builders';
import { ICommand } from '../services/interaction/ICommand';

const halo: ICommand = {
  data: new SlashCommandBuilder()
    .setName('halo')
    .setDescription('HALO JEST TU KTOŚ?!'),
  execute: async (interaction) => {
    await interaction.reply(
      'https://cdn.discordapp.com/attachments/644608604959408156/831957507341418576/f3.png',
    );
    await interaction.followUp(
      Math.random() > 0.5 ? 'HALO' : 'NIKOGO NIE SŁYSZĘ',
    );
  },
};

export default halo;
