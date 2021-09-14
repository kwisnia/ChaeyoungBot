import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton } from 'discord.js';
import { ICommand } from '../services/interaction/ICommand';
import { fetchGIF } from '../utils/fetchHelpers';

let row: MessageActionRow;

const yuna: ICommand = {
  data: new SlashCommandBuilder()
    .setName('yuna')
    .setDescription('They keep talking, I keep walking'),
  execute: async (interaction) => {
    row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('yuna')
        .setLabel('Give me more')
        .setStyle('PRIMARY'),
    );
    const searchPhrase = Math.random() < 0.01 ? 'yunaffx' : 'yuna';
    await interaction.reply({
      content: await fetchGIF(searchPhrase),
      components: [row],
    });
  },
  handleComponentInteraction: async (interaction) => {
    const searchPhrase = Math.random() < 0.01 ? 'yunaffx' : 'yuna';
    await interaction.update({
      content: interaction.message.content,
      components: [],
    });
    await interaction.followUp({
      content: await fetchGIF(searchPhrase),
      components: [row],
    });
  },
};

export default yuna;
