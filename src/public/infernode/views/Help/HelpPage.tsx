import React from 'react';
import Stack from 'react-bootstrap/Stack';
import { Card } from 'react-bootstrap';
import { HelpSidebar } from './HelpSidebar';
import { Outlet } from 'react-router-dom';

export const HelpPage: React.FC = () =>{
  return (
    <Stack direction="horizontal" gap={3}>
      <HelpSidebar/>
      <Card>
        <Outlet/>
      </Card>
    </Stack>
  );
}