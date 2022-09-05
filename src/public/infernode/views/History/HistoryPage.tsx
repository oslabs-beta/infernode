import React, { useEffect } from 'react';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import HistorySidebar from './HistorySidebar';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setActivePage } from '../../store/configSlice';

export default function HistoryPage(): JSX.Element {
  const { current } = useAppSelector((state) => state.captures);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActivePage('/history'));
  });

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
