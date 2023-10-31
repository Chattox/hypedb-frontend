import { Alert, Box, Container, Group, Loader, Stack } from "@mantine/core";
import classes from "./AppContainer.module.css";
import { GameTable } from "../GameTable";
import { useQuery } from "@apollo/client";
import { GET_GAMES } from "../../utils/operations";
import { useEffect, useState } from "react";
import { formatData } from "../../utils/formatData";
import { customTheme } from "../../theme";
import { IconSkull } from "@tabler/icons-react";

export const AppContainer = () => {
  const { data, loading, error, refetch } = useQuery(GET_GAMES);
  const [formattedData, setFormattedData] = useState<GameTableEntry[]>([]);

  useEffect(() => {
    if (!loading && !error) {
      setFormattedData(formatData(data.games));
    }
  }, [loading, error, data]);

  const refreshData = () => {
    refetch().then((res) => {
      setFormattedData(formatData(res.data.games));
    });
  };

  const ServerError = () => {
    return (
      <Alert
        title="Uh oh!"
        color="color-mix(in srgb, var(--mantine-color-error) 75%, transparent)"
        variant="filled"
        icon={<IconSkull />}
        className={classes.ServerError}
      >
        Something has gone wrong and data isn't being received from the server.
        Please try again later.
      </Alert>
    );
  };

  return (
    <Container size="75vw" pt="xl" className={classes.AppContainer}>
      {error ? (
        <ServerError />
      ) : loading && formattedData.length === 0 ? (
        <Loader />
      ) : (
        <GameTable
          isLoading={loading}
          gamesData={formattedData}
          refreshData={refreshData}
        />
      )}
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
