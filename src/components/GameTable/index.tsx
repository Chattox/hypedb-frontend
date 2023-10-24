import { useEffect, useState } from "react";
import { AddGame } from "../AddGame";
import { TableDisplay } from "./TableDisplay";
import { Box, Button } from "@mantine/core";

export const GameTable = (props: {
  isLoading: boolean;
  gameData: GameTableEntry[];
  refreshData: () => void;
}) => {
  const [gameData, setGameData] = useState<GameTableEntry[]>(props.gameData);

  useEffect(() => {
    if (!props.isLoading) {
      setGameData(props.gameData);
    }
  }, [props.isLoading, props.gameData]);

  return (
    <Box>
      <TableDisplay isLoading={props.isLoading} gameData={gameData} />
      <AddGame />
      <Button onClick={props.refreshData}>Refresh</Button>
    </Box>
  );
};
