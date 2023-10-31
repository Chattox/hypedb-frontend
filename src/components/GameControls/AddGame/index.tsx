import { Box, ActionIcon, Modal, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { GameForm } from "../../GameForm";
import { ADD_GAME } from "../../../utils/operations";
import classes from "../GameControls.module.css";

export const AddGame = (props: { genreTags?: string[]; refreshData: () => void }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Box>
      <Modal
        opened={opened}
        onClose={close}
        title="Add Game"
        classNames={{
          header: classes.gameFormModalHeader,
          body: classes.gameFormModalBody,
          content: classes.gameFormModalContent,
          close: classes.gameFormModalClose,
        }}
      >
        <GameForm mutation={ADD_GAME} refreshData={props.refreshData} closeModal={close} />
      </Modal>

      <Tooltip
        label="Add a new game"
        transitionProps={{ transition: "slide-up", duration: 150 }}
        classNames={{
          tooltip: classes.addGameTooltip,
          arrow: classes.addGameTooltip,
        }}
        withArrow
        arrowSize={5}
      >
        <ActionIcon variant="subtle" color="hypePurple.0" size="lg" onClick={open}>
          <IconPlus size={32} />
        </ActionIcon>
      </Tooltip>
    </Box>
  );
};
