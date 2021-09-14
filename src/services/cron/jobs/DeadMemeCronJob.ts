import { CronJob } from 'cron';
import { Client } from 'discord.js';
import { inject, injectable } from 'inversify';
import { sample } from 'lodash';
import { Logger } from 'winston';
import BOT_TYPES from '../../../botTypes';
import deadMemeRepository from '../../../repositories/DeadMemeRepository';
import { ICronJob } from '../ICronJob';

@injectable()
class DeadMemeCronJob implements ICronJob {
  private job: CronJob;

  constructor(
    @inject(BOT_TYPES.Logger) private logger: Logger,
    @inject(BOT_TYPES.Client) private client: Client,
  ) {
    this.job = new CronJob('00 00 06 * * *', async () => {
      this.logger.info('Setting Pietrek nickname');
      const memes = await deadMemeRepository.getMemes();
      const server = await this.client.guilds.fetch('641947344765452298');
      if (server) {
        const target = await server.members.fetch('684428967192690708');
        if (target) {
          await target.setNickname(sample(memes) || null);
          this.logger.info('Nickname successfully set');
        }
      }
    });
  }

  public run(): Promise<void> {
    this.job.start();
    return Promise.resolve();
  }
}

export default DeadMemeCronJob;
