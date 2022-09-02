import React from 'react';
import {
  Stack,
  Spinner,
} from 'react-bootstrap';
import { useAppSelector } from '../../store/hooks';

export default function AppStatusCircle() {
  const { isAppRunning } = useAppSelector((state) => state.app);
  const appRunning = (
    <Stack direction="horizontal" gap={3}>
      <Spinner animation="border" variant="success" />
    </Stack>
  );
  const appNotRunning = (<p>app is no longer running</p>);

  return (
    <div>
      {isAppRunning ? appRunning : appNotRunning}
    </div>
  );
}
