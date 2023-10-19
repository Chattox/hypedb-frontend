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
