import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton } from 'discord.js';
import { ICommand } from '../services/interaction/ICommand';
import { fetchGIF } from '../utils/fetchHelpers';

let row: MessageActionRow;

const jisoo: ICommand = {
  data: new SlashCommandBuilder()
    .setName('jisoo')
    .setDescription("I'm Jisoo, I'm okay"),
  execute: async (interaction) => {
    row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('jisoo')
        .setLabel('Give me more')
        .setStyle('PRIMARY'),
    );
    await interaction.reply({
      content: await fetchGIF('jisoo'),
      components: [row],
    });
  },
  handleComponentInteraction: async (interaction) => {
    await interaction.update({
      content: interaction.message.content,
      components: [],
    });
    await interaction.followUp({
      content: await fetchGIF('jisoo'),
      components: [row],
    });
  },
};

export default jisoo;
