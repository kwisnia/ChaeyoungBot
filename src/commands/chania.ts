import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton } from 'discord.js';
import { ICommand } from '../services/interaction/ICommand';
import { fetchGIF } from '../utils/fetchHelpers';

let row: MessageActionRow;

const ryujin: ICommand = {
  data: new SlashCommandBuilder()
    .setName('chania')
    .setDescription(
      'Niektórzy mówią, że ona nazywa się Ryujin, ale kłamią. Jestem tego pewien.',
    ),
  execute: async (interaction) => {
    row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('chania')
        .setLabel('Give me more')
        .setStyle('PRIMARY'),
    );
    await interaction.reply({
      content: await fetchGIF('ryujin'),
      components: [row],
    });
  },
  handleComponentInteraction: async (interaction) => {
    await interaction.update({
      content: interaction.message.content,
      components: [],
    });
    await interaction.followUp({
      content: await fetchGIF('ryujin'),
      components: [row],
    });
  },
};

export default ryujin;
