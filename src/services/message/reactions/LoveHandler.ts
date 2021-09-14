import { Message } from 'discord.js';
import { inject, injectable } from 'inversify';
import { Logger } from 'winston';
import BOT_TYPES from '../../../botTypes';
import { IReactHandler } from './IReactHandler';

@injectable()
class LoveHandler implements IReactHandler {
  constructor(@inject(BOT_TYPES.Logger) private logger: Logger) {}

  public check(message: Message): boolean {
    if (
      message.mentions.has('881494881049137152') &&
      message.content.includes('❤️')
    ) {
      this.logger.info('<3');
      return true;
    }
    return false;
  }

  public async react(message: Message): Promise<void> {
    this.logger.info('Love reaction called');
    await message.reply(
      `${message.author} https://tenor.com/view/chaeyoung-son-chaeyoung-twice-cute-gif-19442356`,
    );
    return Promise.resolve();
  }
}

export default LoveHandler;
