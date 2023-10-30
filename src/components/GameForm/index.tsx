import { useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { ReleaseDatePicker } from "./ReleaseDatePIcker";
import classes from "./GameForm.module.css";
import { useDisclosure } from "@mantine/hooks";

export const GameForm = (props: {
  mutation: any;
  gameValues?: GameInput;
  refreshData: () => void;
  closeModal: () => void;
}) => {
  const [mutation, { loading, error }] = useMutation(props.mutation);
  const [visible, { toggle }] = useDisclosure(false);

  const initValues: GameInput = {
    name: "",
    genre: "",
    linkUrl: "",
    description: "",
    hypeScore: 0,
    releaseDate: {
      dateType: "specific",
      dateString: "",
    },
  };

  const urlRegex = /http(s?):\/\/(\w+\.)*(\/?\w*)*/;

  const form = useForm({
    initialValues: props.gameValues ? props.gameValues : initValues,
    validate: {
      name: (val) => (val.length < 1 ? "Please enter the game title" : null),
      genre: (val) => (val.length < 1 ? "Please enter the genre" : null),
      linkUrl: (val) =>
        !urlRegex.test(val) ? "Please enter a valid URL" : null,
      description: (val) =>
        val.length < 1 ? "Please enter the game description" : null,
      hypeScore: (val) =>
        val < 0 || val > 11
          ? "HypeScore must be 0 or above or 11 and below"
          : null,
      releaseDate: (val) =>
        val.dateString.length < 1
          ? "Please enter the game's release date"
          : null,
    },
  });

  const handleOnSubmit = (values: GameInput) => {
    toggle();
    const variables = props.gameValues
      ? { game: { originalName: props.gameValues.name, updatedGame: values } }
      : { game: values };
    mutation({ variables })
      .then(() => {
        props.refreshData();
        props.closeModal();
      })
      .catch((e) => console.log(JSON.stringify(e, null, 2)));
  };

  return (
    <Box>
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <form onSubmit={form.onSubmit((values) => handleOnSubmit(values))}>
        <TextInput
          label="Title"
          classNames={{
            input: classes.gameFormInput,
          }}
          {...form.getInputProps("name")}
        />
        <TextInput
          label="Genre"
          classNames={{ input: classes.gameFormInput }}
          {...form.getInputProps("genre")}
        />
        <TextInput
          label="Link URL"
          classNames={{ input: classes.gameFormInput }}
          {...form.getInputProps("linkUrl")}
        />
        <TextInput
          label="Description"
          classNames={{ input: classes.gameFormInput }}
          {...form.getInputProps("description")}
        />
        <NumberInput
          label="HypeScore"
          min={0}
          max={11}
          clampBehavior="strict"
          classNames={{ input: classes.gameFormInput }}
          {...form.getInputProps("hypeScore")}
        />
        <ReleaseDatePicker
          currentDate={props.gameValues?.releaseDate}
          {...form.getInputProps("releaseDate")}
        />

        <Group justify="flex-end" mt="lg">
          <Button type="submit">
            {props.gameValues ? "Update" : "Add game"}
          </Button>
          {error ? <p>Error</p> : null}
          {loading ? <p>Submitting...</p> : null}
        </Group>
      </form>
    </Box>
  );
};
