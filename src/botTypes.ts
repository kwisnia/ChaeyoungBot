const BOT_TYPES = {
  Bot: Symbol.for('Bot'),
  Client: Symbol.for('Client'),
  Logger: Symbol.for('Logger'),
  EventController: Symbol.for('EventController'),
  Repository: {
    CommandRepository: Symbol.for('CommandRepository'),
  },
  Service: {
    Cron: {
      DeadMeme: Symbol.for('DeadMemeCronJob'),
      Covid: Symbol.for('CovidCronJob'),
      SemesterSix: Symbol.for('SemesterSix'),
      Runner: Symbol.for('CronJobRunner'),
    },
    Message: {
      Reactions: {
        Fancy: Symbol.for('Fancy'),
        Holt: Symbol.for('Holt'),
        Idol: Symbol.for('Idol'),
        Kill: Symbol.for('Kill'),
        Love: Symbol.for('Love'),
        Pedo: Symbol.for('Pedo'),
      },
      MessageService: Symbol.for('MessageService'),
    },
    Interaction: {
      InteractionService: Symbol.for('InteractionService'),
    },
  },
};

export default BOT_TYPES;
