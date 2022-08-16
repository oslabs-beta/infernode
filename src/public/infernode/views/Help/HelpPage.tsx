import React from 'react';
import Stack from 'react-bootstrap/Stack';
import { Card } from 'react-bootstrap';
import { HelpSidebar } from './HelpSidebar';

export const HelpPage: React.FC = () =>{
  return (
    <Stack direction="horizontal" gap={3}>
      <HelpSidebar/>
      <Card><img src='/mocks/help-content.png'/></Card>
    </Stack>
  );
}