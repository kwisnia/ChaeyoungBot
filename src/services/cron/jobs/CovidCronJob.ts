import { CronJob } from 'cron';
import { Client } from 'discord.js';
import { inject, injectable } from 'inversify';
import { Logger } from 'winston';
import BOT_TYPES from '../../../botTypes';
import { fetchCovid } from '../../../utils/fetchHelpers';
import { ICronJob } from '../ICronJob';

@injectable()
class DeadMemeCronJob implements ICronJob {
  private job: CronJob;

  constructor(
    @inject(BOT_TYPES.Logger) private logger: Logger,
    @inject(BOT_TYPES.Client) private client: Client,
  ) {
    this.job = new CronJob('00 00 10 * * *', async () => {
      const channel = await this.client.channels.fetch('793824865005731900');
      if (channel && channel.isText()) {
        const data = await fetchCovid();
        await channel.send(`Faworytka pandemia update!

    **Nowych zakażeń: ${data.todayCases}
    Zmarło: ${data.todayDeaths}
    Wyzdrowiało: ${data.todayRecovered}**

Stay safe!`);
      }
    });
  }

  public run(): Promise<void> {
    this.job.start();
    return Promise.resolve();
  }
}

export default DeadMemeCronJob;
