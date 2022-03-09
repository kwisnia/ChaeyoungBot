import 'reflect-metadata';
import { Client, Intents } from 'discord.js';
import { Container } from 'inversify';
import * as winston from 'winston';
import BOT_TYPES from './botTypes';
import FancyHandler from './services/message/reactions/FancyHandler';
import { IEventController } from './events/IEventController';
import EventController from './events/EventController';
import { IMessageService } from './services/message/IMessageService';
import MessageService from './services/message/MessageService';
import { ICommandRepository } from './repositories/ICommandRepository';
import CommandRepository from './repositories/CommandRepository';
import InteractionService from './services/interaction/InteractionService';
import { IInteractionService } from './services/interaction/IInteractionService';
import HoltHandler from './services/message/reactions/HoltHandler';
import IdolHandler from './services/message/reactions/IdolHandler';
import KillHandler from './services/message/reactions/KillHandler';
import LoveHandler from './services/message/reactions/LoveHandler';
import PedoHandler from './services/message/reactions/PedoHandler';
import CovidCronJob from './services/cron/jobs/CovidCronJob';
import DeadMemeCronJob from './services/cron/jobs/DeadMemeCronJob';
import { IReactHandler } from './services/message/reactions/IReactHandler';
import { ICronJob } from './services/cron/ICronJob';
import { ICronJobRunner } from './services/cron/ICronJobRunner';
import CronJobRunner from './services/cron/CronJobRunner';
import SemesterSixCronJob from './services/cron/jobs/SemesterSixCronJob';

const container = new Container();
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'log' }),
  ],
  format: winston.format.printf(
    (log) => `[${log.level.toUpperCase()}] - ${log.message}`,
  ),
});

container.bind<Client>(BOT_TYPES.Client).toConstantValue(
  new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_VOICE_STATES,
      Intents.FLAGS.DIRECT_MESSAGES,
      Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    ],
    presence: {
      activities: [
        {
          name: 'The Feels',
          type: 'LISTENING',
          url: 'https://www.youtube.com/watch?v=fmOEKOjyDxU',
        },
      ],
    },
    partials: ['CHANNEL']
  }),
);
container.bind<winston.Logger>(BOT_TYPES.Logger).toConstantValue(logger);
container
  .bind<ICommandRepository>(BOT_TYPES.Repository.CommandRepository)
  .toConstantValue(new CommandRepository(logger));
container.bind<IEventController>(BOT_TYPES.EventController).to(EventController);
container
  .bind<IInteractionService>(BOT_TYPES.Service.Interaction.InteractionService)
  .to(InteractionService);
container
  .bind<IMessageService>(BOT_TYPES.Service.Message.MessageService)
  .to(MessageService);
container
  .bind<IReactHandler>(BOT_TYPES.Service.Message.Reactions.Fancy)
  .to(FancyHandler);
container
  .bind<IReactHandler>(BOT_TYPES.Service.Message.Reactions.Holt)
  .to(HoltHandler);
container
  .bind<IReactHandler>(BOT_TYPES.Service.Message.Reactions.Idol)
  .to(IdolHandler);
container
  .bind<IReactHandler>(BOT_TYPES.Service.Message.Reactions.Kill)
  .to(KillHandler);
container
  .bind<IReactHandler>(BOT_TYPES.Service.Message.Reactions.Love)
  .to(LoveHandler);
container
  .bind<PedoHandler>(BOT_TYPES.Service.Message.Reactions.Pedo)
  .to(PedoHandler);
container.bind<ICronJobRunner>(BOT_TYPES.Service.Cron.Runner).to(CronJobRunner);
container.bind<ICronJob>(BOT_TYPES.Service.Cron.Covid).to(CovidCronJob);
container.bind<ICronJob>(BOT_TYPES.Service.Cron.DeadMeme).to(DeadMemeCronJob);
container.bind<ICronJob>(BOT_TYPES.Service.Cron.SemesterSix).to(SemesterSixCronJob);

export default container;
