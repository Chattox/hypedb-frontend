import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export const AddGame = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Game">
        <p>herpyderp</p>
      </Modal>

      <Button onClick={open}>Add Game</Button>
    </>
  );
};
