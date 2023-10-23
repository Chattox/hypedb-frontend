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
        dateType
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
      genre
      linkUrl
      description
      hypeScore
      releaseDate {
        dateString
        displayString
        dateType
      }
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_GAME = gql`
  mutation DeleteGame($gameName: String!) {
    deleteGame(gameName: $gameName)
  }
`;

export const EDIT_GAME = gql`
  mutation EditGame($game: UpdateGameInput!) {
    updateGame(game: $game) {
      name
      genre
      linkUrl
      description
      hypeScore
      releaseDate {
        dateString
        displayString
        dateType
      }
      createdAt
      updatedAt
    }
  }
`;
