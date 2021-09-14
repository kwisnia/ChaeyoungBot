import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton } from 'discord.js';
import { ICommand } from '../services/interaction/ICommand';
import { fetchGIF } from '../utils/fetchHelpers';

let row: MessageActionRow;

const lisa: ICommand = {
  data: new SlashCommandBuilder()
    .setName('lisa')
    .setDescription("I told you to smile, why won't you smile?"),
  execute: async (interaction) => {
    row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('lisa')
        .setLabel('Give me more')
        .setStyle('PRIMARY'),
    );
    await interaction.reply({
      content: await fetchGIF('lisa'),
      components: [row],
    });
  },
  handleComponentInteraction: async (interaction) => {
    if (interaction.customId === 'lisa') {
      await interaction.update({
        content: interaction.message.content,
        components: [],
      });
      await interaction.followUp({
        content: await fetchGIF('lisa'),
        components: [row],
      });
    }
  },
};

export default lisa;
