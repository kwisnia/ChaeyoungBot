import { SlashCommandBuilder } from '@discordjs/builders';
import { sample } from 'lodash';
import { ICommand } from '../services/interaction/ICommand';

type IStringDecorator = (param: string) => string;
const callbacks: IStringDecorator[] = [
  (string) => string.toLowerCase(),
  (string) => string.toUpperCase(),
  (string) => [string].map((v, i) => (i % 2 ? v : v.toUpperCase())).join(''),
  (string) => [string].map((v, i) => (i % 2 ? v.toUpperCase() : v)).join(''),
];
const yesArray = ['tak', 'tak?', 'tak!'];
const cegielski: ICommand = {
  data: new SlashCommandBuilder()
    .setName('cegielski')
    .setDescription('Owszem. Tak. Mhm.'),
  execute: async (interaction) => {
    const sampleFunction = sample(callbacks) as IStringDecorator;
    const sampleAnswer = sampleFunction(sample(yesArray) as string);
    await interaction.reply(`- "${sampleAnswer}"`);
  },
};

export default cegielski;
