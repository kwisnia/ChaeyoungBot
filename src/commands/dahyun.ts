import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton } from 'discord.js';
import { ICommand } from '../services/interaction/ICommand';
import { fetchGIF } from '../utils/fetchHelpers';

let row: MessageActionRow;

const dahyun: ICommand = {
  data: new SlashCommandBuilder()
    .setName('dahyun')
    .setDescription('Nie wiem co tu wpisać, sry Dahyun fans'),
  execute: async (interaction) => {
    row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('dahyun')
        .setLabel('Give me more')
        .setStyle('PRIMARY'),
    );
    await interaction.reply({
      content: await fetchGIF('dahyun'),
      components: [row],
    });
  },
  handleComponentInteraction: async (interaction) => {
    await interaction.update({
      content: interaction.message.content,
      components: [],
    });
    await interaction.followUp({
      content: await fetchGIF('dahyun'),
      components: [row],
    });
  },
};

export default dahyun;
