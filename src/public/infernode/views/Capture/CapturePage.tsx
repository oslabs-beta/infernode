import React from 'react';
// import Stack from 'react-bootstrap/Stack';
// import Card from 'react-bootstrap/Card';
import {
  Button,
  Form,
  Stack,
  Card,
  Col,
} from 'react-bootstrap';
import CaptureSidebar from './CaptureSidebar';
import { startApp } from '../../store/appSlice';
import { useAppDispatch } from '../../store/hooks';

export default function CapturePage(): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <Stack direction="horizontal" gap={3}>
      <CaptureSidebar />
      <Stack direction="vertical" gap={3}>
        <Card>
          <h4>Choose Your App</h4>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupAppName">
              <Form.Label>App Name</Form.Label>
              <Form.Control type="text" id="appName" placeholder="Enter App Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPath">
              <Form.Label>Relative Path of Entry Point</Form.Label>
              <Form.Control type="text" id="relativePath" placeholder="/enter/relative/path" />
            </Form.Group>
          </Form>
          <div className="d-grid gap-2">
            <Button
              variant="success"
              size="lg"
              onClick={() => {
                const func = async () => {
                  console.log('click start app button');
                  const appNameElement = document.getElementById('appName') as HTMLInputElement;
                  const relativePathElement = document.getElementById('relativePath') as HTMLInputElement;
                  if (appNameElement && relativePathElement) {
                    const appName: string = appNameElement.value;
                    const relativePath: string = relativePathElement.value;
                    console.log('in click event view =>', appName, relativePath);
                    await dispatch(startApp({ appName, relativePath }));
                  }
                };
                func();
              }}
            >
              Start Application
            </Button>
            <Button variant="danger" size="lg">
              Stop Application
            </Button>
          </div>
        </Card>
        <Card>
          <h4>Predetermined Capture Length</h4>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Duration of Capture</Form.Label>
              <Form.Control type="text" placeholder="Enter Duration" />
              <Form.Text className="text-muted">
                Please enter the duration you would like to capture in seconds.
              </Form.Text>
            </Form.Group>
          </Col>
          <Col>
            <Button variant="success" size="lg">
              Start
            </Button>
          </Col>
        </Card>
        <Card>
          <h4>Custom Length Capture</h4>
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
