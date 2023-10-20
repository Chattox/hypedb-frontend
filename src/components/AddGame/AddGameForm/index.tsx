import { useMutation } from '@apollo/client';
import { Box, Button, Group, NumberInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ReleaseDatePicker } from './ReleaseDatePicker';
import { ADD_GAME } from '../../../utils/operations';

export const AddGameForm = () => {
  const [addGame, { loading, error }] = useMutation(ADD_GAME);

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
    validate: {
      name: (val) => (val.length < 1 ? 'Please enter the game title' : null),
      genre: (val) => (val.length < 1 ? 'Please enter the genre' : null),
      linkUrl: (val) => (val.length < 1 ? 'Please enter the game URL' : null),
      description: (val) => (val.length < 1 ? 'Please enter the game description' : null),
      hypeScore: (val) =>
        val < 0 || val > 11 ? 'HypeScore must be 0 or above or 11 and below' : null,
      releaseDate: (val) =>
        val.dateString.length < 1 ? "Please enter the game's release date" : null,
    },
  });

  return (
    <Box>
      <form
        onSubmit={form.onSubmit((values) =>
          addGame({ variables: { game: values } }).catch((e) =>
            console.log(JSON.stringify(e, null, 2))
          )
        )}
      >
        <TextInput label="Title" {...form.getInputProps('name')} />
        <TextInput label="Genre" {...form.getInputProps('genre')} />
        <TextInput label="Link URL" {...form.getInputProps('linkUrl')} />
        <TextInput label="Description" {...form.getInputProps('description')} />
        <NumberInput
          label="HypeScore"
          min={0}
          max={11}
          clampBehavior="strict"
          {...form.getInputProps('hypeScore')}
        />
        <ReleaseDatePicker {...form.getInputProps('releaseDate')} />

        <Group justify="flex-end" mt="lg">
          <Button type="submit">Add game</Button>
          {error ? <p>Error</p> : null}
          {loading ? <p>Submitting...</p> : null}
        </Group>
      </form>
    </Box>
  );
};
