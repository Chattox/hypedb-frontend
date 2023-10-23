import { ColorModeContext } from '@chakra-ui/react';

export const tableSort = (tableState: TableStateProps, column: Column): TableStateProps => {
  const newSortOrder =
    tableState.sortColumn === column.name
      ? tableState.sortOrder === 'asc'
        ? 'desc'
        : 'asc'
      : 'asc';
  console.log(`Old sort order: ${tableState.sortOrder}, new sort order: ${newSortOrder}`);
  console.log(`Old column name: ${tableState.sortColumn}, new column name: ${column.name}`);

  switch (column.type) {
    case 'text':
      return {
        ...tableState,
        sortColumn: column.name,
        sortOrder: newSortOrder,
        gamesData:
          newSortOrder === 'asc'
            ? [...tableState.gamesData].sort((a, b) =>
                (a[column.accessor] as string).toLowerCase() <
                (b[column.accessor] as string).toLowerCase()
                  ? -1
                  : 1
              )
            : [...tableState.gamesData].sort((a, b) =>
                (a[column.accessor] as string).toLowerCase() >
                (b[column.accessor] as string).toLowerCase()
                  ? -1
                  : 1
              ),
      };
    case 'numeric':
      return {
        ...tableState,
        sortColumn: column.name,
        sortOrder: newSortOrder,
        gamesData:
          newSortOrder === 'asc'
            ? [...tableState.gamesData].sort((a, b) =>
                (a[column.accessor] as number) < (b[column.accessor] as number) ? -1 : 1
              )
            : [...tableState.gamesData].sort((a, b) =>
                (a[column.accessor] as number) > (b[column.accessor] as number) ? -1 : 1
              ),
      };
    case 'releaseDate':
      return {
        ...tableState,
        sortColumn: column.name,
        sortOrder: newSortOrder,
        gamesData: [...tableState.gamesData].sort((a, b) => {
          const aDate = (a[column.accessor] as ReleaseDateTableEntry).date;
          const bDate = (b[column.accessor] as ReleaseDateTableEntry).date;

          if (aDate.isBefore(bDate)) {
            return newSortOrder === 'asc' ? -1 : 1;
          } else if (aDate.isAfter(bDate)) {
            return newSortOrder === 'asc' ? 1 : -1;
          } else {
            return 0;
          }
        }),
      };
  }
  return tableState;
};
