import React from 'react';
import Stack from 'react-bootstrap/Stack';
import { Card } from 'react-bootstrap';
import { CaptureSidebar } from './CaptureSidebar';

export const CapturePage: React.FC = () => (
  <Stack direction="horizontal" gap={3}>
    <CaptureSidebar />
    <Card><img src="/mocks/capture-content.png" /></Card>
  </Stack>
);
