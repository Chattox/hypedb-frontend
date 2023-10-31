import { useState } from "react";
import { Modal, ActionIcon, Popover } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { DELETE_GAME, EDIT_GAME } from "../../utils/operations";
import { GameForm } from "../GameForm";
import { useMutation } from "@apollo/client";
import classes from "./GameControls.module.css";

export const GameControls = (props: {
  gameValues: GameTableEntry;
  refreshData: () => void;
}) => {
  const [gameFormOpened, { open, close }] = useDisclosure(false);
  const [delConfirmOpen, setDelConfirmOpen] = useState<boolean>(false);
  const [deleteGame] = useMutation(DELETE_GAME);
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

  const handleDeleteOnClick = () => {
    deleteGame({ variables: { gameName: gameValues.name } })
      .then(() => props.refreshData())
      .catch((e) => console.log(JSON.stringify(e, null, 2)));
  };

  return (
    <>
      <Modal
        opened={gameFormOpened}
        onClose={close}
        title="Update Game"
        classNames={{
          header: classes.gameFormModalHeader,
          body: classes.gameFormModalBody,
          content: classes.gameFormModalContent,
          close: classes.gameFormModalClose,
        }}
      >
        <GameForm
          mutation={EDIT_GAME}
          gameValues={editGameValues}
          refreshData={props.refreshData}
          closeModal={close}
        />
      </Modal>

      <ActionIcon.Group className={classes.gameControls}>
        <ActionIcon
          variant="subtle"
          aria-label="Edit game"
          onClick={open}
          color="hypePurpleSecondary"
        >
          <IconPencil />
        </ActionIcon>
        <Popover
          opened={delConfirmOpen}
          onChange={setDelConfirmOpen}
          position="top"
          classNames={{ dropdown: classes.delConfirmation }}
          transitionProps={{ transition: "slide-up", duration: 150 }}
          offset={4}
        >
          <Popover.Target>
            <ActionIcon
              variant="subtle"
              aria-label="Delete game"
              onClick={() => setDelConfirmOpen((o) => !o)}
              color="hypePink"
            >
              <IconX />
            </ActionIcon>
          </Popover.Target>
          <Popover.Dropdown>
            <ActionIcon
              variant="subtle"
              aria-label="Delete game confirmation"
              onClick={handleDeleteOnClick}
              color="hypePink"
            >
              <IconCheck height={28} width={28} />
            </ActionIcon>
          </Popover.Dropdown>
        </Popover>
      </ActionIcon.Group>
    </>
  );
};
