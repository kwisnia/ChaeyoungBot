import { SlashCommandBuilder } from '@discordjs/builders';
import { ICommand } from '../services/interaction/ICommand';

const pasek: ICommand = {
  data: new SlashCommandBuilder()
    .setName('pasek')
    .setDescription('GIB HER BACK'),
  execute: async (interaction) => {
    await interaction.reply(
      `༼ つ ◕\\_◕ ༽つ *GIB MONIKA PASEK BACK* ༼ つ ◕\\_◕ ༽つ
༼ つ ◕\\_◕ ༽つ *GIB MONIKA PASEK BACK* ༼ つ ◕\\_◕ ༽つ 
༼ つ ◕\\_◕ ༽つ *GIB MONIKA PASEK BACK* ༼ つ ◕\\_◕ ༽つ`,
    );
  },
};

export default pasek;
