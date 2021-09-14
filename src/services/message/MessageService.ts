import { Message } from 'discord.js';
import { inject, injectable } from 'inversify';
import { Logger } from 'winston';
import { IMessageService } from './IMessageService';
import BOT_TYPES from '../../botTypes';
import { IReactHandler } from './reactions/IReactHandler';

@injectable()
class MessageService implements IMessageService {
  constructor(
    @inject(BOT_TYPES.Logger) private logger: Logger,
    @inject(BOT_TYPES.Service.Message.Reactions.Fancy)
    private fancyReact: IReactHandler,
    @inject(BOT_TYPES.Service.Message.Reactions.Holt)
    private holtReact: IReactHandler,
    @inject(BOT_TYPES.Service.Message.Reactions.Idol)
    private idolReact: IReactHandler,
    @inject(BOT_TYPES.Service.Message.Reactions.Kill)
    private killReact: IReactHandler,
    @inject(BOT_TYPES.Service.Message.Reactions.Love)
    private loveReact: IReactHandler,
    @inject(BOT_TYPES.Service.Message.Reactions.Pedo)
    private pedoReact: IReactHandler,
  ) {}

  public async handleCreate(message: Message): Promise<void> {
    this.logger.info('Checking the message...');
    if (this.fancyReact.check(message)) {
      await this.fancyReact.react(message);
    }
    if (this.holtReact.check(message)) {
      await this.holtReact.react(message);
    }
    if (this.killReact.check(message)) {
      await this.killReact.react(message);
    }
    if (this.loveReact.check(message)) {
      await this.loveReact.react(message);
    }
    if (this.pedoReact.check(message)) {
      await this.pedoReact.react(message);
    }
    await this.idolReact.react(message);
  }
}

export default MessageService;
