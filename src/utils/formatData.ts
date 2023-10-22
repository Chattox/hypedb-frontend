import spacetime from 'spacetime';

export const formatData = (data: Game[]): GameTableEntry[] => {
  return data.map((game) => ({
    ...game,
    releaseDate: {
      date: spacetime(game.releaseDate.dateString),
      displayString: game.releaseDate.displayString,
      dateType: game.releaseDate.dateType,
    },
    createdAt: spacetime(parseInt(game.createdAt)),
    updatedAt: spacetime(parseInt(game.updatedAt)),
  }));
};
