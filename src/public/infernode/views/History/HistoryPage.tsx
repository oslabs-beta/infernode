import React from 'react';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import HistorySidebar from './HistorySidebar';
import { useAppSelector } from '../../store/hooks';

export default function HistoryPage(): JSX.Element {
  const { current } = useAppSelector((state) => state.captures);
  let realid = 0;
  let haveid = false;
  console.log(`Processing updated current item: ${current || 'null'}`);
  if (current !== null) {
    realid = current;
    haveid = true;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <HistorySidebar />
      <Card>
        {haveid && <iframe src={`/api/captures/${realid}`} title="flamegraph" width="1000" height="800" />}
      </Card>
    </Stack>
  );
}
