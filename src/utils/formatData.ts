import spacetime from 'spacetime';

export const formatData = (data: Game[]): GameTableEntry[] => {
  return data.map((game) => ({
    ...game,
    releaseDate: {
      date: spacetime(parseInt(game.releaseDate.dateString)),
      displayString: game.releaseDate.displayString,
    },
    createdAt: spacetime(parseInt(game.createdAt)),
    updatedAt: spacetime(parseInt(game.updatedAt)),
  }));
};
