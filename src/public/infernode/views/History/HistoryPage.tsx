import React from 'react';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import HistorySidebar from './HistorySidebar';

export default function HistoryPage(): JSX.Element {
  return (
    <Stack direction="horizontal" gap={3}>
      <HistorySidebar />
      <Card>
        <img alt="mock history page header" src="/mocks/history-header.png" />
        <div style={{ width: 1024, height: 'auto' }}>
          <embed type="image/svg+xml" src="/node-example-fg.svg" width="1024" />
        </div>
        <img alt="mock history page footer" src="/mocks/history-footer.png" />
      </Card>
    </Stack>
  );
}
