import { SlashCommandBuilder } from '@discordjs/builders';
import { ICommand } from '../services/interaction/ICommand';

const isildur: ICommand = {
  data: new SlashCommandBuilder()
    .setName('isildur')
    .setDescription('Cast It Into The Fire! Destroy It!'),
  execute: async (interaction) => {
    await interaction.reply(
      'https://tenor.com/view/lotr-ring-no-isildur-lord-of-the-rings-gif-5743603',
    );
  },
};

export default isildur;
