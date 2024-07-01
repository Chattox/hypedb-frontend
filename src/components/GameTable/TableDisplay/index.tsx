import { Button, Flex, Loader, Table } from "@mantine/core";
import { useEffect, useState } from "react";
import { tableSort } from "../../../utils/tableSort";
import classes from "./Tabledisplay.module.css";
import { GameControls } from "../../GameControls";
import {
  IconChevronDown,
  IconChevronUp,
  IconExternalLink,
} from "@tabler/icons-react";
import { AddGame } from "../../GameControls/AddGame";
import { Genres } from "./Genres";

export const TableDisplay = (props: {
  isLoading: boolean;
  gamesData: GameTableEntry[];
  genreTags?: string[];
  refreshData: () => void;
}) => {
  const [state, setState] = useState<TableStateProps>({
    gamesData: [],
    sortOrder: "asc",
    sortColumn: " ",
  });

  useEffect(() => {
    if (!props.isLoading) {
      if (state.sortColumn !== " ") {
        const column = columns.find((c) => c.name === state.sortColumn);
        const sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
        setState({
          ...tableSort(
            { ...state, sortOrder: sortOrder, gamesData: props.gamesData },
            column!
          ),
        });
      } else {
        setState({ ...state, gamesData: props.gamesData });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.gamesData, props.isLoading]);

  const columns: Column[] = [
    { name: "Title", type: "text", isSortable: true, accessor: "name" },
    { name: "Genre", type: "text", isSortable: false, accessor: "genre" },
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
    { name: "addGame", type: "text", isSortable: false, accessor: "" },
  ];

  const rows = state.gamesData.map((game) => (
    <Table.Tr key={game.name}>
      <Table.Td>{game.name}</Table.Td>
      <Table.Td>
        <Genres genres={game.genre} />
      </Table.Td>
      <Table.Td>
        <Button
          component="a"
          href={game.linkUrl}
          target="_blank"
          rel="nofollow noopener noreferrer"
          variant="transparent"
          rightSection={<IconExternalLink size="1rem" />}
          className={classes.gameTableCellLink}
        >
          Link
        </Button>
      </Table.Td>
      <Table.Td>{game.description}</Table.Td>
      <Table.Td>{game.hypeScore}</Table.Td>
      <Table.Td>{game.releaseDate.displayString}</Table.Td>
      <Table.Td>{game.createdAt.format("{numeric-uk} {time-24}")}</Table.Td>
      <Table.Td>{game.updatedAt.format("{numeric-uk} {time-24}")}</Table.Td>
      <Table.Td>
        <GameControls
          gameValues={game}
          genreTags={props.genreTags}
          refreshData={props.refreshData}
        />
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
          {columns.map((column) => {
            if (column.name === "addGame") {
              return (
                <Table.Th key={column.name}>
                  <AddGame
                    genreTags={props.genreTags}
                    refreshData={props.refreshData}
                  />
                </Table.Th>
              );
            }
            return (
              <Table.Th
                key={column.name}
                onClick={
                  column.isSortable ? () => handleOnClick(column) : undefined
                }
              >
                <Flex
                  justify="center"
                  align="center"
                  gap="xs"
                  className={
                    column.isSortable
                      ? classes.gameTableSortableHeader
                      : undefined
                  }
                >
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
            );
          })}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
