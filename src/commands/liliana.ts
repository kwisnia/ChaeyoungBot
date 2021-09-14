import { SlashCommandBuilder } from '@discordjs/builders';
import { ICommand } from '../services/interaction/ICommand';

const liliana: ICommand = {
  data: new SlashCommandBuilder()
    .setName('liliana')
    .setDescription('Gdy ci starsza pani pierdoli o nośnikach danych :)'),
  execute: async (interaction) => {
    await interaction.reply(
      'https://cdn.discordapp.com/attachments/652414550523641856/834027075689381898/Jabonowski-_za_eb_kura.mp4',
    );
  },
};

export default liliana;
