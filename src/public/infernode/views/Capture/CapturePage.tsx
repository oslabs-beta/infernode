import React from 'react';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import CaptureSidebar from './CaptureSidebar';

export default function CapturePage(): JSX.Element {
  return (
    <Stack direction="horizontal" gap={3}>
      <CaptureSidebar />
      <Card>
        <img alt="mock capture page content" src="/mocks/capture-content.png" />
      </Card>
    </Stack>
  );
}
