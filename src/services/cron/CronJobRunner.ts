import { inject, injectable } from 'inversify';
import { Logger } from 'winston';
import BOT_TYPES from '../../botTypes';
import { ICronJob } from './ICronJob';
import { ICronJobRunner } from './ICronJobRunner';

@injectable()
class CronJobRunner implements ICronJobRunner {
  constructor(
    @inject(BOT_TYPES.Logger) private logger: Logger,
    @inject(BOT_TYPES.Service.Cron.Covid) private covidCronJob: ICronJob,
    @inject(BOT_TYPES.Service.Cron.DeadMeme) private deadMemeCronJob: ICronJob,
  ) {}

  public async runAllJobs(): Promise<void> {
    await this.covidCronJob.run();
    await this.deadMemeCronJob.run();
    return Promise.resolve();
  }
}

export default CronJobRunner;
