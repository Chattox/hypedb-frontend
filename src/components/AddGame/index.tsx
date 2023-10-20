import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AddGameForm } from './AddGameForm';

export const AddGame = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Game">
        <AddGameForm />
      </Modal>

      <Button onClick={open}>Add Game</Button>
    </>
  );
};
