import { gql } from '@apollo/client';

export const GET_GAMES = gql`
  query GetGames {
    games {
      name
      genre
      linkUrl
      description
      hypeScore
      releaseDate {
        dateString
        displayString
      }
      createdAt
      updatedAt
    }
  }
`;

export const ADD_GAME = gql`
  mutation AddGame($game: GameInput!) {
    addGame(game: $game) {
      name
    }
  }
`;
