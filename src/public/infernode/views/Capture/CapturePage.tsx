import React, {
  useEffect, useState,
} from 'react';
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
import {
  startApp, stopApp, startCapture, checkIsAppRunning, checkIsAppCapturing,
} from '../../store/appSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import AppStatusCircle from './AppStatusCircle';
import { setActivePage } from '../../store/configSlice';

export default function CapturePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const {
    pid, appName, isAppRunning, isAppCapturing,
  } = useAppSelector((state) => state.app);
  const [appId, setAppId] = useState<number | null>(null);
  const [capId, setCapId] = useState<number | null>(null);
  useEffect(() => {
    dispatch(setActivePage('/capture'));
  });

  // const dispatchMemo = useCallback(dispatch, [dispatch]);
  // const appIdMemo = useMemo(() => appId, [appId]);
  // const capIdMemo = useMemo(() => capId, [capId]);

  console.log('start app polling 1', isAppRunning);
  useEffect(() => {
    if (isAppRunning) {
      const newAppId = setInterval(() => dispatch(checkIsAppRunning(pid)), 10000);
      setAppId(Number(newAppId));
      console.log('start app polling 3');
    } else {
      console.log('start app polling 4');
      console.log('appId', appId);
      if (appId) clearInterval(appId);
      if (capId) clearInterval(capId); // if app no longer running, stop cap imediately?
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAppRunning]);

  useEffect(() => {
    if (isAppCapturing) {
      const newCapId = setInterval(() => dispatch(checkIsAppCapturing()), 10000);
      setCapId(Number(newCapId));
      // console.log('start cap polling 5');
    } else {
      // console.log('start cap polling 6');
      // console.log('capId', capId);
      if (capId) clearInterval(capId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAppCapturing]);

  const startAppEvent = async () => {
    console.log('click start app button');
    const appNameElement = document.getElementById('appName') as HTMLInputElement;
    const relativePathElement = document.getElementById('relativePath') as HTMLInputElement;
    if (appNameElement && relativePathElement) {
      const newAppName: string = appNameElement.value;
      const filePath: string = relativePathElement.value;
      console.log('in click event view =>', appName, filePath);
      await dispatch(startApp({ appName: newAppName, filePath }));
    }
  };

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
                  startAppEvent().catch((err) => console.log('Err in start app button', err));
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
                  func().catch((err) => console.log('Err in stop app button', err));
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
                    const func = () => dispatch(startCapture({ pid, duration }));
                    func()
                      .catch((err) => {
                        console.log('Error in Start Capture onclick event: ', err);
                      });
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
