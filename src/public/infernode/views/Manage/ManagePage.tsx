import React from 'react';
import Stack from 'react-bootstrap/Stack';
import { Card } from 'react-bootstrap';
import { ManageSidebar } from './ManageSidebar';

export const ManagePage: React.FC = () => (
  <Stack direction="horizontal" gap={3}>
    <ManageSidebar />
    <Card>
      <form
        method="POST"
        action="/api/captures"
        encType="multipart/form-data"
      >
        <input type="file" name="capture" />
        <input type="submit" />
      </form>
      <img src="/mocks/manage-content.png" />
    </Card>
  </Stack>
);
