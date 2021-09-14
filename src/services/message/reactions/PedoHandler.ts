import { Message } from 'discord.js';
import { inject, injectable } from 'inversify';
import { Logger } from 'winston';
import BOT_TYPES from '../../../botTypes';
import { IReactHandler } from './IReactHandler';

@injectable()
class PedoHandler implements IReactHandler {
  constructor(@inject(BOT_TYPES.Logger) private logger: Logger) {}

  private RISKY_WORDS = ['pedof', 'pedop'];

  public check(message: Message): boolean {
    if (this.RISKY_WORDS.some((word) => message.content.includes(word))) {
      this.logger.info('Pedo found');
      return true;
    }
    return false;
  }

  public async react(message: Message): Promise<void> {
    this.logger.info('Pedo reaction called');
    await message.reply(
      ':oncoming_police_car: risky risky wiggy wiggy this is an emergency :oncoming_police_car:',
    );
    await message.react('<:faworytkazamknijmorde:788039637892595733>');
    await message.react('👮');
    return Promise.resolve();
  }
}

export default PedoHandler;
