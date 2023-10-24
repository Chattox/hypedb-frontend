import { Loader, Table } from "@mantine/core";
import { DeleteGame } from "../../DeleteGame";
import { EditGame } from "../../EditGame";
import { useEffect, useState } from "react";
import { tableSort } from "../../../utils/tableSort";

export const TableDisplay = (props: {
  isLoading: boolean;
  gameData: GameTableEntry[];
}) => {
  const [state, setState] = useState<TableStateProps>({
    gamesData: props.gameData,
    sortOrder: "desc",
    sortColumn: "Title",
    loaded: false,
  });

  useEffect(() => {
    if (state.loaded && state.gamesData.length > 0) {
      const newState = tableSort(state, columns[0]);
      setState({ ...state, sortOrder: "asc", gamesData: newState.gamesData });
    } else {
      setState({
        ...state,
        gamesData: props.gameData,
        loaded: props.gameData.length > 0 ? true : false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.gameData, state.loaded]);

  const columns: Column[] = [
    { name: "Title", type: "text", isSortable: true, accessor: "name" },
    { name: "Genre", type: "text", isSortable: true, accessor: "genre" },
    { name: "Link", type: "text", isSortable: false, accessor: "linkUrl" },
    {
      name: "Description",
      type: "text",
      isSortable: false,
      accessor: "description",
    },
    {
      name: "HypeScore",
      type: "numeric",
      isSortable: true,
      accessor: "hypeScore",
    },
    {
      name: "Release Date",
      type: "releaseDate",
      isSortable: true,
      accessor: "releaseDate",
    },
    {
      name: "Date Added",
      type: "date",
      isSortable: true,
      accessor: "createdAt",
    },
    {
      name: "Last Updated",
      type: "date",
      isSortable: true,
      accessor: "updatedAt",
    },
  ];

  const rows = state.gamesData.map((game) => (
    <Table.Tr key={game.name}>
      <Table.Td>{game.name}</Table.Td>
      <Table.Td>{game.genre}</Table.Td>
      <Table.Td>{game.linkUrl}</Table.Td>
      <Table.Td>{game.description}</Table.Td>
      <Table.Td>{game.hypeScore}</Table.Td>
      <Table.Td>{game.releaseDate.displayString}</Table.Td>
      <Table.Td>{game.createdAt.format("{numeric-uk} {time-24}")}</Table.Td>
      <Table.Td>{game.updatedAt.format("{numeric-uk} {time-24}")}</Table.Td>
      <Table.Td>
        <EditGame gameValues={game} />
      </Table.Td>
      <Table.Td>
        <DeleteGame gameName={game.name} />
      </Table.Td>
    </Table.Tr>
  ));

  const handleOnClick = (c: Column) => {
    setState({ ...tableSort(state, c) });
  };

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          {columns.map((column) => (
            <Table.Th
              key={column.name}
              onClick={
                column.isSortable ? () => handleOnClick(column) : undefined
              }
            >
              {column.name}
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      {props.isLoading ? <Loader /> : <Table.Tbody>{rows}</Table.Tbody>}
    </Table>
  );
};
