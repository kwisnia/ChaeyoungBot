import { Message } from 'discord.js';
import { inject, injectable } from 'inversify';
import { Logger } from 'winston';
import BOT_TYPES from '../../../botTypes';
import { IReactHandler } from './IReactHandler';

@injectable()
class FancyHandler implements IReactHandler {
  private KEYWORD = 'fancy';

  private RESPONSE = 'Fancy, woo!';

  private REACTIONS = ['🇫', '🇦', '🇳', '🇨', '🇾', '🇼', '🇴', '🅾️'];

  constructor(@inject(BOT_TYPES.Logger) private logger: Logger) {}

  public check(message: Message): boolean {
    return (
      message.content.toLowerCase().includes(this.KEYWORD) &&
      !message.author.bot
    );
  }

  public async react(message: Message): Promise<void> {
    this.logger.info('Fancy reaction called');
    await message.channel.send(this.RESPONSE);
    this.REACTIONS.forEach(async (reaction) => {
      await message.react(reaction);
    });
  }
}

export default FancyHandler;
