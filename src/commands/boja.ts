import { SlashCommandBuilder } from '@discordjs/builders';
import { ICommand } from '../services/interaction/ICommand';

const boja: ICommand = {
  data: new SlashCommandBuilder()
    .setName('boja')
    .setDescription('Bo Kacper tak robi'),
  execute: async (interaction) => {
    await interaction.reply(
      'https://media.discordapp.net/attachments/644608604959408156/823572844670746654/generalizuj.png',
    );
  },
};

export default boja;
