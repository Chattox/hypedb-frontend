import { TableDisplay } from "./TableDisplay";
import { Box, ScrollArea } from "@mantine/core";
import classes from "./GameTable.module.css";

export const GameTable = (props: {
  isLoading: boolean;
  gamesData: GameTableEntry[];
  refreshData: () => void;
}) => {
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
          gamesData={props.gamesData}
          refreshData={props.refreshData}
        />
      </ScrollArea.Autosize>
    </Box>
  );
};
