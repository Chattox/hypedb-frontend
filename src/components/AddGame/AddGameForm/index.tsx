import { Box, Button, Group, NumberInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ReleaseDatePicker } from './ReleaseDatePicker';

export const AddGameForm = () => {
  const initValues: GameInput = {
    name: '',
    genre: '',
    linkUrl: '',
    description: '',
    hypeScore: 0,
    releaseDate: {
      dateType: 'specific',
      dateString: '',
    },
  };
  const form = useForm({
    initialValues: initValues,
  });

  return (
    <Box>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput label="Title" {...form.getInputProps('name')} />
        <TextInput label="Genre" {...form.getInputProps('genre')} />
        <TextInput label="Link URL" {...form.getInputProps('linkUrl')} />
        <TextInput label="Description" {...form.getInputProps('description')} />
        <NumberInput label="HypeScore" {...form.getInputProps('hypeScore')} />
        <ReleaseDatePicker {...form.getInputProps('releaseDate')} />

        <Group justify="flex-end" mt="lg">
          <Button type="submit">Add game</Button>
        </Group>
      </form>
    </Box>
  );
};
