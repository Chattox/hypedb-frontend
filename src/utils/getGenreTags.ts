export const getGenreTags = (games: Game[]): string[] => {
  const genreTags: string[] = [];

  games.forEach((game) =>
    game.genre.forEach((genre) =>
      genreTags.includes(genre) ? null : genreTags.push(genre),
    ),
  );

  return genreTags;
};
