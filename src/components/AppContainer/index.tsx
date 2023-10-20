import { Container } from '@mantine/core';
import classes from './AppContainer.module.css';
import { GameTable } from '../GameTable';
import { AddGame } from '../AddGame';

export const AppContainer = () => {
  return (
    <Container className={classes.AppContainer}>
      <GameTable />
      <AddGame />
    </Container>
  );
};
