import React from 'react';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import CaptureSidebar from './CaptureSidebar';

export default function CapturePage(): JSX.Element {
  return (
    <Stack direction="horizontal" gap={3}>
      <CaptureSidebar />
      <Stack direction="vertical" gap={3}>
        <Card>
          <div className="d-grid gap-2">
            <div className="row">
              <div className="col-6">
                <Button variant="success" size="lg">
                  Start
                </Button>
              </div>
              <div className="col-6">
                <h6>Click this button to start your app!</h6>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <Button variant="danger" size="lg">
                  Stop
                </Button>
              </div>
              <div className="col-6">
                <h6>Click this button to Stop your app!</h6>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="d-grid gap-2">
            <div className="row">
              <div className="col-6">
                <Button variant="success" size="lg">
                  Start
                </Button>
              </div>
              <div className="col-6">
                <h6>Click this button to start your capture!</h6>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <Button variant="danger" size="lg">
                  Stop
                </Button>
              </div>
              <div className="col-6">
                <h6>Click this button to Stop your capture!</h6>
              </div>
            </div>
          </div>
        </Card>
      </Stack>
    </Stack>
  );
}
