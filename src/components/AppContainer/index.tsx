import { Container } from '@mantine/core';
import classes from './AppContainer.module.css';
import { GameTable } from '../GameTable';

export const AppContainer = () => {
  return (
    <Container className={classes.AppContainer}>
      <GameTable />
    </Container>
  );
};
