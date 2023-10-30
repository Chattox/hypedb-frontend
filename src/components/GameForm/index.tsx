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
import { ReleaseDatePicker } from "./ReleaseDatePicker";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconExclamationMark } from "@tabler/icons-react";
import classes from "./GameForm.module.css";

export const GameForm = (props: {
  mutation: any;
  gameValues?: GameInput;
  refreshData: () => void;
  closeModal: () => void;
}) => {
  const [mutation] = useMutation(props.mutation);
  const [visible, { open, close }] = useDisclosure(false);

  const successIcon = <IconCheck />;
  const errorIcon = <IconExclamationMark />;

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
    open();
    const variables = props.gameValues
      ? { game: { originalName: props.gameValues.name, updatedGame: values } }
      : { game: values };
    mutation({ variables })
      .then(() => {
        props.refreshData();
        props.closeModal();
        notifications.show({
          title: "Success!",
          message: props.gameValues
            ? "Game updated successfully"
            : "Game added succesfully",
          icon: successIcon,
          color: "var(--mantine-color-success)",
          className: classes.gameFormSuccessNotification,
        });
      })
      .catch((e) => {
        notifications.show({
          title: "Error!",
          message: "Something went wrong, please try again",
          icon: errorIcon,
          color: "var(--mantine-color-error)",
          className: classes.gameFormErrorNotification,
        });
        console.log(JSON.stringify(e, null, 2));
        close();
      });
  };

  return (
    <Box>
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <form onSubmit={form.onSubmit((values) => handleOnSubmit(values))}>
        <TextInput label="Title" {...form.getInputProps("name")} />
        <TextInput label="Genre" {...form.getInputProps("genre")} />
        <TextInput label="Link URL" {...form.getInputProps("linkUrl")} />
        <TextInput label="Description" {...form.getInputProps("description")} />
        <NumberInput
          label="HypeScore"
          min={0}
          max={11}
          clampBehavior="strict"
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
        </Group>
      </form>
    </Box>
  );
};
