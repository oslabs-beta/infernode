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
import { startApp, stopApp, startCapture } from '../../store/appSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import AppStatusCircle from './AppStatusCircle';

export default function CapturePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { pid, appName } = useAppSelector((state) => state.app);
  return (
    <div>
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
                      const newAppName: string = appNameElement.value;
                      const relativePath: string = relativePathElement.value;
                      console.log('in click event view =>', appName, relativePath);
                      await dispatch(startApp({ appName: newAppName, relativePath }));
                    }
                  };
                  func();
                }}
              >
                Start Application
              </Button>
              <Button
                variant="danger"
                size="lg"
                onClick={() => {
                  console.log('click on stop app button');
                  console.log('pid is', pid);
                  const func = () => dispatch(stopApp(pid));
                  func();
                }}
              >
                Stop Application
              </Button>
            </div>
            <AppStatusCircle />
          </Card>
          <Card>
            <h4>Predetermined Capture Length</h4>
            <Col>
              <Form.Group className="mb-3" controlId="AppDuration">
                <Form.Label>Duration of Capture</Form.Label>
                <Form.Control type="text" placeholder="Enter Duration" id="duration" />
                <Form.Text className="text-muted">
                  Please enter the duration you would like to capture in seconds.
                </Form.Text>
              </Form.Group>
            </Col>
            <Col>
              <Button
                variant="success"
                size="lg"
                onClick={() => {
                  // grab duration
                  console.log('click the start capture button');
                  const durationElement = document.getElementById('duration') as HTMLInputElement;
                  if (durationElement) {
                    const durationString: string = durationElement.value;
                    const duration = Number(durationString);
                    console.log(duration);
                    console.log('pid is', pid);
                    const func = () => dispatch(startCapture({ pid, duration, appName }));
                    func();
                  }
                }}
              >
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
    </div>
  );
}
