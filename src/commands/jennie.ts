import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton } from 'discord.js';
import { ICommand } from '../services/interaction/ICommand';
import { fetchGIF } from '../utils/fetchHelpers';

let row: MessageActionRow;

const jennie: ICommand = {
  data: new SlashCommandBuilder()
    .setName('jennie')
    .setDescription('Bitch Lenin solo'),
  execute: async (interaction) => {
    row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('jennie')
        .setLabel('Give me more')
        .setStyle('PRIMARY'),
    );
    await interaction.reply({
      content: await fetchGIF('jennie'),
      components: [row],
    });
  },
  handleComponentInteraction: async (interaction) => {
    await interaction.update({
      content: interaction.message.content,
      components: [],
    });
    await interaction.followUp({
      content: await fetchGIF('jennie'),
      components: [row],
    });
  },
};

export default jennie;
