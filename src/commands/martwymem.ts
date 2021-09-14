import { SlashCommandBuilder } from '@discordjs/builders';
import { ICommand } from '../services/interaction/ICommand';
import deadMemeRepository from '../repositories/DeadMemeRepository';

const martwymem: ICommand = {
  data: new SlashCommandBuilder()
    .setName('martwymem')
    .setDescription('Zarządzaj martwymi memami')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('dodaj')
        .setDescription('Dodaj mema')
        .addStringOption((option) =>
          option
            .setName('mem')
            .setDescription('Nick do dodania do puli')
            .setRequired(true),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('usun')
        .setDescription('Usuń mema')
        .addStringOption((option) =>
          option
            .setName('mem')
            .setDescription('Nick do usunięcia z puli')
            .setRequired(true),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand.setName('wyswietl').setDescription('Wyświetla listę memów'),
    ) as SlashCommandBuilder,
  execute: async (interaction) => {
    if (interaction.options.getSubcommand() === 'dodaj') {
      const meme = interaction.options.getString('mem');
      if (meme) {
        const memes = await deadMemeRepository.getMemes();
        memes.push(meme);
        await deadMemeRepository.saveMemes(memes);
        await interaction.reply({
          content: `Dodano mem ${meme} pomyślnie`,
          ephemeral: true,
        });
        return Promise.resolve();
      }
      Promise.reject();
    } else if (interaction.options.getSubcommand() === 'usun') {
      const meme = interaction.options.getString('mem');
      if (meme) {
        const memes = await deadMemeRepository.getMemes();
        await deadMemeRepository.saveMemes(
          memes.filter((memeToFilter) => memeToFilter !== meme),
        );
        await interaction.reply({
          content: `Usunięto mem ${meme} pomyślnie`,
          ephemeral: true,
        });
        return Promise.resolve();
      }
      return Promise.reject();
    } else if (interaction.options.getSubcommand() === 'wyswietl') {
      const memes = await deadMemeRepository.getMemes();
      await interaction.reply({
        content: memes.join('\n'),
        ephemeral: true,
      });
      return Promise.resolve();
    }
    return Promise.reject();
  },
};

export default martwymem;
