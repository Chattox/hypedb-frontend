import { Table } from '@mantine/core';

export const TableDisplay = (props: { gameData: GameTableEntry[] }) => {
  const rows = props.gameData.map((game) => (
    <Table.Tr key={game.name}>
      <Table.Td>{game.name}</Table.Td>
      <Table.Td>{game.genre}</Table.Td>
      <Table.Td>{game.linkUrl}</Table.Td>
      <Table.Td>{game.description}</Table.Td>
      <Table.Td>{game.hypeScore}</Table.Td>
      <Table.Td>{game.releaseDate.displayString}</Table.Td>
      <Table.Td>{game.createdAt.format('{numeric-uk} {time-24}')}</Table.Td>
      <Table.Td>{game.updatedAt.format('{numeric-uk} {time-24}')}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Title</Table.Th>
          <Table.Th>Genre</Table.Th>
          <Table.Th>Link URL</Table.Th>
          <Table.Th>Description</Table.Th>
          <Table.Th>HypeScore</Table.Th>
          <Table.Th>Release Date</Table.Th>
          <Table.Th>Date Added</Table.Th>
          <Table.Th>Date Updated</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
