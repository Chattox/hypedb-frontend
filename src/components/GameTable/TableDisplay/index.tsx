import { Flex, Loader, Table } from "@mantine/core";
import { useEffect, useState } from "react";
import { tableSort } from "../../../utils/tableSort";
import classes from "./Tabledisplay.module.css";
import { GameControls } from "../../GameControls";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

export const TableDisplay = (props: {
  isLoading: boolean;
  gamesData: GameTableEntry[];
  refreshData: () => void;
}) => {
  const [state, setState] = useState<TableStateProps>({
    gamesData: [],
    sortOrder: "asc",
    sortColumn: " ",
  });

  useEffect(() => {
    if (!props.isLoading) {
      setState({ ...state, gamesData: props.gamesData });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.gamesData, props.isLoading]);

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
      withColumnBorders
      classNames={{
        table: classes.gameTableRoot,
        thead: classes.gameTableHeader,
        tr: classes.gameTableRow,
        td: classes.gameTableCell,
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
              <Flex justify="center" align="center" gap="xs">
                <p>{column.name}</p>
                {column.name === state.sortColumn ? (
                  state.sortOrder === "asc" ? (
                    <IconChevronUp />
                  ) : (
                    <IconChevronDown />
                  )
                ) : null}
              </Flex>
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
