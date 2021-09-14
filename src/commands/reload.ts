import { SlashCommandBuilder } from '@discordjs/builders';
import BOT_TYPES from '../botTypes';
import container from '../inversify.config';
import { ICommandRepository } from '../repositories/ICommandRepository';
import { ICommand } from '../services/interaction/ICommand';

const reload: ICommand = {
  data: new SlashCommandBuilder()
    .setName('reload')
    .setDescription('Przeładowuje komendę')
    .addStringOption((option) =>
      option
        .setName('komenda')
        .setDescription('Podaj nazwę komendy')
        .setRequired(true),
    ) as SlashCommandBuilder,
  execute: async (interaction) => {
    const commandName = interaction.options.getString('komenda')?.toLowerCase();
    const commandRepo = container.get<ICommandRepository>(
      BOT_TYPES.Repository.CommandRepository,
    ); // I think I'm doing an anti-pattern here, but you live, you learn I guess
    if (commandName) {
      const command = commandRepo.getCommand(commandName);
      if (!command) {
        await interaction.reply({
          content: 'Przecież tu nikogo takiego nie ma',
          ephemeral: true,
        });
        return Promise.resolve();
      }
      try {
        const { default: newCommand } = await import(
          `./${command.data.name}.ts`
        );
        commandRepo.setCommand(newCommand.data.name, newCommand);
        await interaction.reply({
          content: `Komenda \`${command}\` was reloaded!`,
          ephemeral: true,
        });
        return Promise.resolve();
      } catch (error) {
        await interaction.reply({
          content: `Tu coś niedobrze...\`:\n\`${error}\``,
          ephemeral: true,
        });
        return Promise.reject();
      }
    }
    return Promise.reject();
  },
};

export default reload;
