import { Spacetime } from "spacetime";

export declare global {
  // From DB
  type Game = {
    name: string;
    genre: string[];
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
    dateType: string;
  };

  // For displaying in table
  interface GameTableEntry extends Game {
    [index: string]:
      | string
      | string[]
      | number
      | ReleaseDateTableEntry
      | Spacetime;
    releaseDate: ReleaseDateTableEntry;
    createdAt: Spacetime;
    updatedAt: Spacetime;
  }

  type ReleaseDateTableEntry = {
    date: Spacetime;
    displayString: string;
    dateType: string;
  };

  type Column = {
    name: string;
    type: string;
    isSortable: boolean;
    accessor: string;
  };

  type TableStateProps = {
    gamesData: GameTableEntry[];
    sortOrder: "asc" | "desc";
    sortColumn: string;
  };

  // For adding games to DB
  interface GameInput extends Game {
    releaseDate: ReleaseDateInput;
    createdAt?: string;
    updatedAt?: string;
  }

  type ReleaseDateInput = {
    dateType: string;
    dateString: string;
  };
}
