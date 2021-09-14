import { SlashCommandBuilder } from '@discordjs/builders';
import { ICommand } from '../services/interaction/ICommand';

const krawczyk: ICommand = {
  data: new SlashCommandBuilder()
    .setName('jeszczejak')
    .setDescription('Pijany krawczyk'),
  execute: async (interaction) => {
    await interaction.reply('https://youtu.be/mx9NAa4KGGA');
  },
};

export default krawczyk;
