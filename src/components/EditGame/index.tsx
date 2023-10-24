import { Box, Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { GameForm } from "../GameForm";
import { EDIT_GAME } from "../../utils/operations";

export const EditGame = (props: { gameValues: GameTableEntry; refreshData: () => void }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { gameValues } = props;

  const editGameValues: GameInput = {
    name: gameValues.name,
    genre: gameValues.genre,
    linkUrl: gameValues.linkUrl,
    description: gameValues.description,
    hypeScore: gameValues.hypeScore,
    releaseDate: {
      dateType: gameValues.releaseDate.dateType,
      dateString:
        gameValues.releaseDate.dateType === "custom"
          ? gameValues.releaseDate.displayString
          : gameValues.releaseDate.date.format("iso"),
    },
  };

  return (
    <Box>
      <Modal opened={opened} onClose={close} title="Update Game">
        <GameForm
          mutation={EDIT_GAME}
          gameValues={editGameValues}
          refreshData={props.refreshData}
          closeModal={close}
        />
      </Modal>

      <Button onClick={open}>Edit</Button>
    </Box>
  );
};
