import { writeFileSync } from 'fs';
import { IDeadMemeRepository } from './IDeadMemeRepository';

const deadMemeRepository: IDeadMemeRepository = {
  getMemes: async () => {
    const memesImport = await import('../commands/memy.json');
    return Promise.resolve(memesImport.memes);
  },
  saveMemes: (memes: string[]) => {
    const memeObject = { memes };
    writeFileSync('./memy.json', JSON.stringify(memeObject));
    return Promise.resolve();
  },
};

export default deadMemeRepository;
