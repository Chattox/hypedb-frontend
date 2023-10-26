import { Loader, Table } from "@mantine/core";
import { useEffect, useState } from "react";
import { tableSort } from "../../../utils/tableSort";
import classes from "./Tabledisplay.module.css";
import { GameControls } from "../../GameControls";

export const TableDisplay = (props: {
  isLoading: boolean;
  gameData: GameTableEntry[];
  refreshData: () => void;
}) => {
  const [state, setState] = useState<TableStateProps>({
    gamesData: props.gameData,
    sortOrder: "desc",
    sortColumn: "Title",
  });

  useEffect(() => {
    if (props.isLoading && state.gamesData.length > 0) {
      const newState = tableSort(state, columns[0]);
      setState({ ...state, sortOrder: "asc", gamesData: newState.gamesData });
      setState({ ...state, sortOrder: "asc", gamesData: newState.gamesData });
    } else {
      setState({
        ...state,
        gamesData: props.gameData,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.gameData, props.isLoading]);

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
    { name: "", type: "text", isSortable: false, accessor: "" },
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
        <GameControls gameValues={game} refreshData={props.refreshData} />
      </Table.Td>
    </Table.Tr>
  ));

  const handleOnClick = (c: Column) => {
    setState({ ...tableSort(state, c) });
  };

  if (props.isLoading) {
    return <Loader />;
  }

  return (
    <Table
      highlightOnHover
      withRowBorders={false}
      classNames={{
        table: classes.gameTableRoot,
        thead: classes.gameTableHeader,
        tr: classes.gameTableRow,
      }}
    >
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
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
