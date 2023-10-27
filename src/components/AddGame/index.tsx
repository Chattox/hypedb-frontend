import { Box, ActionIcon, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { GameForm } from "../GameForm";
import { ADD_GAME } from "../../utils/operations";

export const AddGame = (props: { refreshData: () => void }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Box>
      <Modal opened={opened} onClose={close} title="Add Game">
        <GameForm mutation={ADD_GAME} refreshData={props.refreshData} closeModal={close} />
      </Modal>

      <ActionIcon variant="subtle" onClick={open}>
        <IconPlus />
      </ActionIcon>
    </Box>
  );
};
