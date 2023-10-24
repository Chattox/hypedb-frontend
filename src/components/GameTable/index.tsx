import { TableDisplay } from "./TableDisplay";
import { Box } from "@mantine/core";

export const GameTable = (props: {
  isLoading: boolean;
  gameData: GameTableEntry[];
}) => {
  return (
    <Box>
      <TableDisplay isLoading={props.isLoading} gameData={props.gameData} />
    </Box>
  );
};
