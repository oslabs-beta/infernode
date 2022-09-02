import React from 'react';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import { Outlet } from 'react-router-dom';
import HelpSidebar from './HelpSidebar';
import { useAppDispatch } from '../../store/hooks';
import { setActivePage } from '../../store/configSlice';

export default function HelpPage(): JSX.Element {
  const dispatch = useAppDispatch();
  dispatch(setActivePage('/help'));
  return (
    <Stack direction="horizontal" gap={3}>
      <HelpSidebar />
      <Card>
        <Outlet />
      </Card>
    </Stack>
  );
}
