import { Client } from 'discord.js';
import { Logger } from 'winston';
import * as http from 'http';
import container from './inversify.config';
import BOT_TYPES from './botTypes';
import { IEventController } from './events/IEventController';
import { ICommandRepository } from './repositories/ICommandRepository';
import { ICronJobRunner } from './services/cron/ICronJobRunner';

const client = container.get<Client>(BOT_TYPES.Client);
const eventController = container.get<IEventController>(
  BOT_TYPES.EventController,
);
const commandRepository = container.get<ICommandRepository>(
  BOT_TYPES.Repository.CommandRepository,
);
const cronJobRunner = container.get<ICronJobRunner>(
  BOT_TYPES.Service.Cron.Runner,
);
const logger = container.get<Logger>(BOT_TYPES.Logger);

(async () => {
  http
    .createServer((_, res) => {
      res.write("I'm alive");
      res.end();
    })
    .listen(8080);
  client.on('ready', () => {
    logger.info('The bot is online!');
  });
  client.on('debug', (m) => {
    logger.debug(m);
  });
  client.on('warn', (m) => {
    logger.warn(m);
  });
  client.on('error', (m) => {
    logger.error(m);
  });
  await eventController.bindEvents();
  await commandRepository.initCommands();
  await cronJobRunner.runAllJobs();
  process.on('uncaughtException', (error) => logger.error(error));
  try {
    await client.login(process.env.token);
  } catch (e) {
    logger.error(e);
  }
})();
