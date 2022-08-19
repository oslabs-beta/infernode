import React from 'react';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import ManageSidebar from './ManageSidebar';

export default function ManagePage(): JSX.Element {
  return (
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
        <img alt="mock manage page content" src="/mocks/manage-content.png" />
      </Card>
    </Stack>
  );
}
