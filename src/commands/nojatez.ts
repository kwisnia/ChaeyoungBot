import { SlashCommandBuilder } from '@discordjs/builders';
import { ICommand } from '../services/interaction/ICommand';

const nojatez: ICommand = {
  data: new SlashCommandBuilder()
    .setName('nojatez')
    .setDescription('Coming out prezydenta Polski'),
  execute: async (interaction) => {
    await interaction.reply(
      'https://cdn.discordapp.com/attachments/644608604959408156/795705861992873994/Andrzej_Duda_jestem_gejem_no_ja_tez_Trim.mp4',
    );
  },
};

export default nojatez;
