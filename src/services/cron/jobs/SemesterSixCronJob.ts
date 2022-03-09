import { CronJob } from 'cron';
import { Client, MessageEmbed } from 'discord.js';
import { inject, injectable } from 'inversify';
import { DateTime } from 'luxon';
import { Logger } from 'winston';
import BOT_TYPES from '../../../botTypes';
import { fetchCurrencyExchangeRates } from '../../../utils/fetchHelpers';
import { ICronJob } from '../ICronJob';

const TEXTS = [
  'Pamiętajcie że jak dziecko się trzyma to trzeba je zabić!',
  'Chciałbym mieć warsztat z motorami',
  'Naprawa kosztuje 500 zł',
  'W czarnym do twarzy',
  'Mam kolegów w wojsku',
  'Jak zamieszkać w akademiku?',
  'Nie popełniajcie czynów powszechnie nieakceptowalnych w waszych gronach',
  'Żonie i Córce',
];

const CHANIA_HEARTRATE = [
  'W normie',
  'Wysokie',
  'Jihyo scene in M/V',
  'Mina on stage',
];

@injectable()
class SemesterSixCronJob implements ICronJob {
  private job: CronJob;

  constructor(
    @inject(BOT_TYPES.Logger) private logger: Logger,
    @inject(BOT_TYPES.Client) private client: Client,
  ) {
    this.job = new CronJob('00 00 11 * * *', async () => {
      const channel = await this.client.channels.fetch('951229523607834734');
      if (channel && channel.isText()) {
        const data = await fetchCurrencyExchangeRates();
        const embed = new MessageEmbed()
          .setColor('RANDOM')
          .setTitle('Czcigodni, zjebany semestr update!')
          .addFields(
            {
              name: 'Dni od wakacji',
              value: Math.floor(
                DateTime.fromFormat('01/07/2022', 'dd/MM/yyyy').diffNow('days')
                  .days,
              ).toString(),
            },
            {
              name: 'Pozostałe lekcje KSR',
              value: Math.floor(
                DateTime.fromFormat('20/06/2022', 'dd/MM/yyyy').diffNow('weeks')
                  .weeks - 1,
              ).toString(),
            },
            {
              name: 'Tętno Chani',
              value:
                DateTime.now().weekday === 1
                  ? 'Adam Niewiadomski'
                  : CHANIA_HEARTRATE[
                      Math.floor(Math.random() * CHANIA_HEARTRATE.length)
                    ],
            },
            {
              name: '\u200B',
              value: '**💸 1 Rubel jest warty:**',
            },
            {
              name: '🐸 Żappsy',
              value: (data.rates.RUB / data.rates.PLN / 4).toFixed(2),
              inline: true,
            },
            {
              name: '🧽 Eurogąbki',
              value: (data.rates.RUB / data.rates.PLN / 10).toFixed(2),
              inline: true,
            },
            {
              name: '🤖 Robux',
              value: (data.rates.RUB * 0.0125).toFixed(2),
              inline: true,
            },
          )
          .setTimestamp()
          .setFooter(TEXTS[Math.floor(Math.random() * TEXTS.length)]);
        await channel.send({
          embeds: [embed],
        });
      }
    });
  }

  public run(): Promise<void> {
    this.job.start();
    return Promise.resolve();
  }
}

export default SemesterSixCronJob;
