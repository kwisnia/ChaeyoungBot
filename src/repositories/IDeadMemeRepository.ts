export interface IDeadMemeRepository {
  getMemes: () => Promise<string[]>;
  saveMemes: (memes: string[]) => Promise<void>;
}
