import { Guild } from 'discord.js';
import { ISong } from './ISong';

export interface MusicGuild extends Guild {
  queue: ISong[];
}
