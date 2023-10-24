import { Container } from "@mantine/core";
import classes from "./AppContainer.module.css";
import { GameTable } from "../GameTable";
import { AddGame } from "../AddGame";
import { useQuery } from "@apollo/client";
import { GET_GAMES } from "../../utils/operations";
import { useEffect, useState } from "react";
import { formatData } from "../../utils/formatData";

export const AppContainer = () => {
  const { data, loading, error } = useQuery(GET_GAMES);
  const [formattedData, setFormattedData] = useState<GameTableEntry[]>([]);

  useEffect(() => {
    if (!loading && !error) {
      setFormattedData(formatData(data.games));
    }
  }, [loading, error, data]);

  if (error) {
    return <p>Error: {`${error.message}`}</p>;
  }

  return (
    <Container className={classes.AppContainer}>
      <GameTable isLoading={loading} gameData={formattedData} />
    </Container>
  );
};
