import {
  AudioPlayer,
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  VoiceConnection,
} from '@discordjs/voice';
import * as dlplayer from 'play-dl';
import { ISong } from '../typings/ISong';
import { youtubeCookie } from '../../config.json';

const createNewAudioPlayer = async (
  queue: ISong[],
  connection: VoiceConnection,
): Promise<AudioPlayer> => {
  const player = createAudioPlayer();
  let stream = await dlplayer.stream(queue[0].videoUrl, youtubeCookie);
  let resource = createAudioResource(stream.stream, {
    inputType: stream.type,
  });
  player.play(resource);
  player.on(AudioPlayerStatus.Idle, async () => {
    queue.shift();
    if (queue.length) {
      stream = await dlplayer.stream(queue[0].videoUrl);
      resource = createAudioResource(stream.stream, {
        inputType: stream.type,
      });
      player.play(resource);
    } else {
      connection.destroy();
    }
  });
  return Promise.resolve(player);
};

export default createNewAudioPlayer;
