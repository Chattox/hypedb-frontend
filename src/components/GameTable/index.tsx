import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_GAMES } from '../../utils/operations';
import { formatData } from '../../utils/formatData';
import { TableDisplay } from './TableDisplay';
import { Box } from '@mantine/core';

export const GameTable = () => {
  const { loading, error, data } = useQuery(GET_GAMES);
  const [formattedData, setFormattedData] = useState<GameTableEntry[]>([]);

  useEffect(() => {
    if (!loading && !error) {
      setFormattedData(formatData(data.games));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  if (error) {
    return <p>Error: {`${error.message}`}</p>;
  }

  return <Box>{loading ? <p>Loading</p> : <TableDisplay gameData={formattedData} />}</Box>;
};
