import { Message } from 'discord.js';
import { inject, injectable } from 'inversify';
import { Logger } from 'winston';
import BOT_TYPES from '../../../botTypes';
import { IReactHandler } from './IReactHandler';
import { idols } from './idols.json';

@injectable()
class IdolHandler implements IReactHandler {
  constructor(@inject(BOT_TYPES.Logger) private logger: Logger) {}

  public check(message: Message): boolean {
    // Placeholder
    this.logger.info('Checking idols');
    return message.content.includes('idols');
  }

  public async react(message: Message): Promise<void> {
    idols.forEach((idol) => {
      if (
        idol.names.some((name) =>
          message.content.toLowerCase().includes(name.toLowerCase()),
        )
      ) {
        this.logger.info('Idol found');
        idol.emotes.forEach((emote) => {
          message.react(emote);
        });
      }
    });

    return Promise.resolve();
  }
}

export default IdolHandler;
