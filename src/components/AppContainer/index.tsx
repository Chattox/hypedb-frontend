import { Box, Container, Group, Loader, Stack } from "@mantine/core";
import classes from "./AppContainer.module.css";
import { GameTable } from "../GameTable";
import { useQuery } from "@apollo/client";
import { GET_GAMES } from "../../utils/operations";
import { useEffect, useState } from "react";
import { formatData } from "../../utils/formatData";
import { AddGame } from "../AddGame";
import { customTheme } from "../../theme";

export const AppContainer = () => {
  const { data, loading, error, refetch, networkStatus } = useQuery(GET_GAMES);
  const [formattedData, setFormattedData] = useState<GameTableEntry[]>([]);

  useEffect(() => {
    if (!loading && !error) {
      setFormattedData(formatData(data.games));
    }
  }, [loading, error, data]);

  console.log(networkStatus);

  const refreshData = () => {
    refetch().then((res) => {
      setFormattedData(formatData(res.data.games));
      setFormattedData(formatData(res.data.games));
    });
  };

  if (error) {
    return <p>Error: {`${error.message}`}</p>;
  }

  return (
    <Container size="lg" pt="xl" className={classes.AppContainer}>
      {loading ? (
        <Loader />
      ) : (
        <GameTable isLoading={loading} gameData={formattedData} refreshData={refreshData} />
      )}
      <AddGame refreshData={refreshData} />
      <Group>
        <Stack gap={0}>
          {customTheme.colors?.hypePurplePrimary?.map((c) => (
            <Box style={{ height: "32px", width: "32px" }} bg={c} />
          ))}
        </Stack>
        <Stack gap={0}>
          {customTheme.colors?.hypePink?.map((c) => (
            <Box style={{ height: "32px", width: "32px" }} bg={c} />
          ))}
        </Stack>
        <Stack gap={0}>
          {customTheme.colors?.hypePurpleSecondary?.map((c) => (
            <Box style={{ height: "32px", width: "32px" }} bg={c} />
          ))}
        </Stack>
        <Stack gap={0}>
          {customTheme.colors?.hypeBlue?.map((c) => (
            <Box style={{ height: "32px", width: "32px" }} bg={c} />
          ))}
        </Stack>
        <Stack gap={0}>
          {customTheme.colors?.hypeGreen?.map((c) => (
            <Box style={{ height: "32px", width: "32px" }} bg={c} />
          ))}
        </Stack>
        <Stack gap={0}>
          {customTheme.colors?.hypeYellow?.map((c) => (
            <Box style={{ height: "32px", width: "32px" }} bg={c} />
          ))}
        </Stack>
      </Group>
    </Container>
  );
};
