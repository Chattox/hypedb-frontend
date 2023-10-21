import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { GameForm } from '../GameForm';
import { ADD_GAME } from '../../utils/operations';

export const AddGame = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Game">
        <GameForm mutation={ADD_GAME} />
      </Modal>

      <Button onClick={open}>Add Game</Button>
    </>
  );
};
