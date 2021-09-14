import { Message } from 'discord.js';

export interface IReactHandler {
  check(message: Message): boolean;
  react(message: Message): Promise<void>;
}
