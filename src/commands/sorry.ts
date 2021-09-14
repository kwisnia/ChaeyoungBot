import { SlashCommandBuilder } from '@discordjs/builders';
import { ICommand } from '../services/interaction/ICommand';

const sorry: ICommand = {
  data: new SlashCommandBuilder()
    .setName('sorry')
    .setDescription('Chania przeprasza, ale nie do końca'),
  execute: async (interaction) => {
    await interaction.reply(
      'https://cdn.discordapp.com/attachments/689111723264966677/808730901541945385/unknown.png',
    );
  },
};

export default sorry;
