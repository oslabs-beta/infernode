import React from 'react';
import Stack from 'react-bootstrap/Stack';
import { Card } from 'react-bootstrap';
import { HistorySidebar } from './HistorySidebar';

export const HistoryPage: React.FC = () =>{
  return (
    <Stack direction="horizontal" gap={3}>
      <HistorySidebar/>
      <Card><img src='/mocks/history-content.png'/></Card>
    </Stack>
  );
}