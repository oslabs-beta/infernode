import React from 'react';
import Stack from 'react-bootstrap/Stack';
import { Card } from 'react-bootstrap';
import { ManageSidebar } from './ManageSidebar';

export const ManagePage: React.FC = () =>{
  return (
    <Stack direction="horizontal" gap={3}>
      <ManageSidebar/>
      <Card><img src='/mocks/manage-content.png'/></Card>
    </Stack>
  );
}