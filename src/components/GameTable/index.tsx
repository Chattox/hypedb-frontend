import { useEffect, useState } from "react";
import { TableDisplay } from "./TableDisplay";
import { Box, ScrollArea } from "@mantine/core";
import classes from "./GameTable.module.css";

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
      <ScrollArea className={classes.gameTableContainer} mah="80vh">
        <TableDisplay
          isLoading={props.isLoading}
          gameData={gameData}
          refreshData={props.refreshData}
        />
      </ScrollArea>
    </Box>
  );
};
