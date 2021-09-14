import { Message } from 'discord.js';

export interface IMessageService {
  handleCreate(message: Message): Promise<void>;
}
