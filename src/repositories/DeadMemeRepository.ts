import { readFileSync, writeFileSync } from 'fs';
import { IDeadMemeRepository } from './IDeadMemeRepository';

const deadMemeRepository: IDeadMemeRepository = {
  getMemes: async () => {
    const memesImport = JSON.parse(readFileSync('./src/commands/memy.json', {
      encoding: 'utf-8',
    }));
    return Promise.resolve(memesImport.memes);
  },
  saveMemes: (memes: string[]) => {
    const memeObject = { memes };
    writeFileSync('./src/commands/memy.json', JSON.stringify(memeObject));
    return Promise.resolve();
  },
};

export default deadMemeRepository;
