import { SlashCommandBuilder } from '@discordjs/builders';
import * as dlplayer from 'play-dl';
import { joinVoiceChannel } from '@discordjs/voice';
import { GuildMember } from 'discord.js';
import { ICommand } from '../services/interaction/ICommand';
import { MusicGuild } from '../typings/MusicGuild';
import createNewAudioPlayer from '../utils/AudioPlayerFactory';

const play: ICommand = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Zagraj coś')
    .addStringOption((option) =>
      option
        .setName('video_url')
        .setDescription('Video to play')
        .setRequired(true),
    ) as SlashCommandBuilder,
  execute: async (interaction) => {
    const guild = interaction.guild as MusicGuild;
    const member = interaction.member as GuildMember;
    const channel = member.voice.channelId;
    let url = interaction.options.getString('video_url');
    if (!guild) {
      await interaction.reply({
        content: 'Ale ja nie działam na DMach',
        ephemeral: true,
      });
      return Promise.resolve();
    }
    if (!channel) {
      await interaction.reply({
        content: 'Dołącz do kanału głosowego',
        ephemeral: true,
      });
      return Promise.resolve();
    }
    if (!url) {
      await interaction.reply({
        content: 'Nie podałeś linka...',
        ephemeral: true,
      });
      return Promise.resolve();
    }
    const youtubeCheck = dlplayer.yt_validate(url);
    if (youtubeCheck === 'search' || !youtubeCheck) {
      const searchResults = await dlplayer.search(url, {
        limit: 1,
        source: { youtube: 'video' },
      });
      if (!searchResults[0]) {
        await interaction.reply({
          content: 'Nie udało się nic znaleźć z tym co podałeś :(',
          ephemeral: true,
        });
        return Promise.resolve();
      }
      url = searchResults[0].url;
    }
    if (!guild.queue) {
      guild.queue = [];
    }
    const songInfo = await dlplayer.video_basic_info(url);
    const newSong = {
      title: songInfo.video_details.title || 'Unknown title',
      videoUrl: url,
      length: +songInfo.video_details.durationInSec,
      thumbnailUrl: songInfo.video_details.thumbnails[0].url,
    };
    guild.queue.push(newSong);
    if (guild.queue.length === 1) {
      const connection = joinVoiceChannel({
        channelId: channel,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator,
      });
      const player = await createNewAudioPlayer(guild.queue, connection);
      connection.subscribe(player);
      interaction.reply(`Rozpoczęto odtwarzanie \`${newSong.title}\``);
    } else {
      interaction.reply(`Dodano \`${newSong.title}\` do kolejki`);
    }
    return Promise.resolve();
  },
};

export default play;
