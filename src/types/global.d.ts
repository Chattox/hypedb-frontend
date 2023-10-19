import { Spacetime } from 'spacetime';

export declare global {
  type Game = {
    name: string;
    genre: string;
    linkUrl: string;
    description: string;
    hypeScore: number;
    releaseDate: ReleaseDate;
    createdAt: string;
    updatedAt: string;
  };

  type ReleaseDate = {
    dateString: string;
    displayString: string;
  };

  interface GameTableEntry extends Game {
    [index: string]: string | number | ReleaseDateTableEntry | Spacetime;
    releaseDate: ReleaseDateTableEntry;
    createdAt: Spacetime;
    updatedAt: Spacetime;
  }

  type ReleaseDateTableEntry = {
    date: Spacetime;
    displayString: string;
  };
}
