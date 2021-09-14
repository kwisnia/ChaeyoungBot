import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton } from 'discord.js';
import { ICommand } from '../services/interaction/ICommand';
import { fetchGIF } from '../utils/fetchHelpers';

let row: MessageActionRow;

const chaeryeong: ICommand = {
  data: new SlashCommandBuilder()
    .setName('chaeryeong')
    .setDescription('Nie wiem. Spytaj Mateusza'),
  execute: async (interaction) => {
    row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('chaeryeong')
        .setLabel('Give me more')
        .setStyle('PRIMARY'),
    );
    await interaction.reply({
      content: await fetchGIF('chaeryeong'),
      components: [row],
    });
  },
  handleComponentInteraction: async (interaction) => {
    await interaction.update({
      content: interaction.message.content,
      components: [],
    });
    await interaction.followUp({
      content: await fetchGIF('chaeryeong'),
      components: [row],
    });
  },
};

export default chaeryeong;
