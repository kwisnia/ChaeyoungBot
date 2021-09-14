import { SlashCommandBuilder } from '@discordjs/builders';
import { ICommand } from '../services/interaction/ICommand';

const sorry: ICommand = {
  data: new SlashCommandBuilder()
    .setName('sp')
    .setDescription('Wielkie słowa wielkiego człowieka!'),
  execute: async (interaction) => {
    await interaction.reply(
      'https://cdn.discordapp.com/attachments/641978408292712450/773973789611393044/unknown.png',
    );
  },
};

export default sorry;
