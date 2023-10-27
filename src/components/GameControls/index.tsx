import { Modal, ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil, IconX } from "@tabler/icons-react";
import { DELETE_GAME, EDIT_GAME } from "../../utils/operations";
import { GameForm } from "../GameForm";
import { useMutation } from "@apollo/client";

export const GameControls = (props: {
  gameValues: GameTableEntry;
  refreshData: () => void;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
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
      <Modal opened={opened} onClose={close} title="Update Game">
        <GameForm
          mutation={EDIT_GAME}
          gameValues={editGameValues}
          refreshData={props.refreshData}
          closeModal={close}
        />
      </Modal>

      <ActionIcon.Group>
        <ActionIcon
          variant="subtle"
          aria-label="Edit game"
          onClick={open}
          color="hypePurpleSecondary"
        >
          <IconPencil />
        </ActionIcon>
        <ActionIcon
          variant="subtle"
          aria-label="Delete game"
          onClick={handleDeleteOnClick}
          color="hypePink"
        >
          <IconX />
        </ActionIcon>
      </ActionIcon.Group>
    </>
  );
};
