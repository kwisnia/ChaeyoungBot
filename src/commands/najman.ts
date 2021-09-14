import { SlashCommandBuilder } from '@discordjs/builders';
import { ICommand } from '../services/interaction/ICommand';

const najman: ICommand = {
  data: new SlashCommandBuilder()
    .setName('najman')
    .setDescription('Wielkie słowa wielkiego człowieka!'),
  execute: async (interaction) => {
    await interaction.reply(
      'https://cdn.discordapp.com/attachments/643506639986753567/763501030737969232/co_ty_pierdolisz_czowieku.mp4',
    );
  },
};

export default najman;
