import { useMutation } from "@apollo/client";
import { Button } from "@mantine/core";
import { DELETE_GAME } from "../../utils/operations";

export const DeleteGame = (props: {
  gameName: string;
  refreshData: () => void;
}) => {
  const [deleteGame] = useMutation(DELETE_GAME);
  const handleOnClick = () => {
    deleteGame({ variables: { gameName: props.gameName } })
      .then(() => props.refreshData())
      .catch((e) => console.log(JSON.stringify(e, null, 2)));
  };
  return <Button onClick={handleOnClick}>Delete</Button>;
};
