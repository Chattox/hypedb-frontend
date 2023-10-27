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
      <ScrollArea.Autosize
        classNames={{
          root: classes.gameTableContainer,
          thumb: classes.gameTableScrollbarThumb,
          scrollbar: classes.gameTableScrollbar,
        }}
        mah="80vh"
        scrollHideDelay={150}
      >
        <TableDisplay
          isLoading={props.isLoading}
          gameData={gameData}
          refreshData={props.refreshData}
        />
      </ScrollArea.Autosize>
    </Box>
  );
};
