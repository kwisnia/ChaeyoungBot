import { SlashCommandBuilder } from '@discordjs/builders';
import { ICommand } from '../services/interaction/ICommand';

const riskyrisky: ICommand = {
  data: new SlashCommandBuilder().setName('riskyrisky').setDescription('risky'),
  execute: async (interaction) => {
    await interaction.reply(
      ':oncoming_police_car: risky risky wiggy wiggy this is an emergency :oncoming_police_car:',
    );
  },
};

export default riskyrisky;
