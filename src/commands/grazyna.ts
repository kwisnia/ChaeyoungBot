import { SlashCommandBuilder } from '@discordjs/builders';
import { ICommand } from '../services/interaction/ICommand';

const maranda: ICommand = {
  data: new SlashCommandBuilder()
    .setName('grazyna')
    .setDescription('grazynka be like'),
  execute: async (interaction) => {
    await interaction.reply(
      'w moich oczach jawicie się jako zespół. jesteście zespołem i to dużym. jesteście bardzo dobrą kreatywną grupą.',
    );
    [1, 2].forEach(async () => {
      await interaction.channel?.send(
        'w moich oczach jawicie się jako zespół. jesteście zespołem i to dużym. jesteście bardzo dobrą kreatywną grupą.',
      );
    });
  },
};

export default maranda;
