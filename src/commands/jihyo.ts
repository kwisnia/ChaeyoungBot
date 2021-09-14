import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton } from 'discord.js';
import { ICommand } from '../services/interaction/ICommand';
import { fetchGIF } from '../utils/fetchHelpers';

let row: MessageActionRow;

const gruba: ICommand = {
  data: new SlashCommandBuilder()
    .setName('jihyo')
    .setDescription('Stan her 💖'),
  execute: async (interaction) => {
    row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('jihyo')
        .setLabel('Give me more 💖')
        .setStyle('SUCCESS'),
    );
    await interaction.reply({
      content: await fetchGIF('jihyotwice'),
      components: [row],
    });
  },
  handleComponentInteraction: async (interaction) => {
    await interaction.update({
      content: interaction.message.content,
      components: [],
    });
    await interaction.followUp({
      content: await fetchGIF('jihyotwice'),
      components: [row],
    });
  },
};

export default gruba;
