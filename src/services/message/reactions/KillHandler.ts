import { Message } from 'discord.js';
import { inject, injectable } from 'inversify';
import { Logger } from 'winston';
import BOT_TYPES from '../../../botTypes';
import { IReactHandler } from './IReactHandler';

@injectable()
class KillHandler implements IReactHandler {
  constructor(@inject(BOT_TYPES.Logger) private logger: Logger) {}

  public check(message: Message): boolean {
    if (
      message.content.toLowerCase().includes('zabij') &&
      message.content.toLowerCase().includes('mnie') &&
      !message.author.bot
    ) {
      this.logger.info('Edgy boy found');
      return true;
    }
    return false;
  }

  public async react(message: Message): Promise<void> {
    this.logger.info('Kill reaction called');
    await message.react('<:faworytkazamknijmorde:788039637892595733>');
    await message.reply(
      'https://cdn.discordapp.com/attachments/791363713969815583/834175881387049000/ZcpSqaG.png',
    );
    return Promise.resolve();
  }
}

export default KillHandler;
