import React from 'react';
import Stack from 'react-bootstrap/Stack';
import { Card } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { HelpSidebar } from './HelpSidebar';

export const HelpPage: React.FC = () => (
  <Stack direction="horizontal" gap={3}>
    <HelpSidebar />
    <Card>
      <Outlet />
    </Card>
  </Stack>
);
