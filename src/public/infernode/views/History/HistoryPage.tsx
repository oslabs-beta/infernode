import React, { useEffect } from 'react';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setActivePage } from '../../store/configSlice';
import ListSidebar from '../../components/layout/ListSidebar';

export default function HistoryPage(): JSX.Element {
  const { current } = useAppSelector((state) => state.captures);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
  if (!haveid) navigate('/capture', { replace: true });
  return (
    <Stack direction="horizontal" gap={3}>
      <ListSidebar />
      <Card>
        {haveid && <iframe src={`/api/captures/${realid}`} title="flamegraph" width="1000" height="800" />}
      </Card>
    </Stack>
  );
}
