import { Message } from 'discord.js';
import { inject, injectable } from 'inversify';
import { Logger } from 'winston';
import BOT_TYPES from '../../../botTypes';
import { IReactHandler } from './IReactHandler';

@injectable()
class HoltHandler implements IReactHandler {
  constructor(@inject(BOT_TYPES.Logger) private logger: Logger) {}

  public check(message: Message): boolean {
    if (message.author.bot) return false;
    if (message.content.toLowerCase().includes('?')) {
      this.logger.info('Question found');
      return true;
    }
    return false;
  }

  public async react(message: Message): Promise<void> {
    this.logger.info('Holt reaction called');
    await message.react('<:holt:826127694752251955>');
    return Promise.resolve();
  }
}

export default HoltHandler;
