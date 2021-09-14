import { SlashCommandBuilder } from '@discordjs/builders';
import { ICommand } from '../services/interaction/ICommand';

const cojest: ICommand = {
  data: new SlashCommandBuilder()
    .setName('cojest')
    .setDescription('Netflix & Chill'),
  execute: async (interaction) => {
    await interaction.reply(
      Math.random() > 0.1
        ? 'https://cdn.discordapp.com/attachments/694564497662148679/799684339449200650/unknown.png'
        : 'https://cdn.discordapp.com/attachments/791363713969815583/831794515378831370/unknown.png',
    );
  },
};

export default cojest;
