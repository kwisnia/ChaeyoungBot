import { SlashCommandBuilder } from '@discordjs/builders';
import { ICommand } from '../services/interaction/ICommand';

const TEXT =
  'tak jak powiedziałam już wcześniej, zapraszam na moją specjalizację bo żadne z nas nie jest kierownikiem tego przedmiotu';

const maranda: ICommand = {
  data: new SlashCommandBuilder()
    .setName('maranda')
    .setDescription('Zapraszam na moją specjalizację'),
  execute: async (interaction) => {
    await interaction.reply(TEXT);
    [1, 2].forEach(async () => {
      await interaction.channel?.send(TEXT);
    });
  },
};

export default maranda;
