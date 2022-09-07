import React, { useEffect, useState } from 'react';
import {
  Button, Form, Stack, Card, Col, Tab, Nav,
} from 'react-bootstrap';
import {
  startApp,
  stopApp,
  startCapture,
  checkIsAppRunning,
  setAppCapturing,
  startAppAndCapture,
} from '../../store/appSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import LabeledSpinner from '../../components/LabeledSpinner';
import ListSidebar from '../../components/layout/ListSidebar';
import { setActivePage } from '../../store/configSlice';
import { fetchAllCaptures } from '../../store/captureSlice';

type CapButtonProps = {
  variant: string;
  disabled?: boolean;
  onClick?: () => void | null;
  children?: React.ReactNode;
};

function CapButton(props: CapButtonProps): JSX.Element {
  const {
    variant, disabled, onClick, children,
  } = props;
  return (
    <Button
      variant={variant}
      disabled={disabled}
      onClick={onClick}
      size="lg"
      style={{ width: '200px' }}
    >
      {children}
    </Button>
  );
}

CapButton.defaultProps = {
  onClick: null,
  disabled: false,
  children: null,
};

function RunApplicationForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const { pid, isAppRunning, isAppCapturing } = useAppSelector(
    (state) => state.app,
  );
  const startAppEvent = async () => {
    const appNameElement = document.getElementById(
      'appName',
    ) as HTMLInputElement;
    const relativePathElement = document.getElementById(
      'relativePath',
    ) as HTMLInputElement;
    if (appNameElement && relativePathElement) {
      const newAppName: string = appNameElement.value;
      const filePath: string = relativePathElement.value;
      await dispatch(startApp({ appName: newAppName, filePath }));
    }
  };

  return (
    <>
      <h4>Choose Your App</h4>
      <Form>
        <Form.Group className="mb-3" controlId="appName">
          <Form.Label>App Name</Form.Label>
          <Form.Control type="text" placeholder="Enter App Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="relativePath">
          <Form.Label>Relative Path of Entry Point</Form.Label>
          <Form.Control
            type="text"
            defaultValue="../../src/examples/app-test.js"
          />
        </Form.Group>
      </Form>
      <div className="d-grid gap-2">
        {!isAppRunning && !isAppCapturing ? (
          <CapButton
            variant="success"
            onClick={() => {
              startAppEvent().catch((err) => console.log('Err in start app button', err));
            }}
          >
            Start Application
          </CapButton>
        ) : (
          <CapButton variant="success" disabled>
            <LabeledSpinner label="Running..." />
          </CapButton>
        )}

        <CapButton
          variant="danger"
          disabled={!isAppRunning}
          onClick={() => {
            const func = () => dispatch(stopApp(pid));
            func().catch((err) => console.log('Err in stop app button', err));
          }}
        >
          Stop Application
        </CapButton>
      </div>
    </>
  );
}

function FixedLengthCaptureForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const { pid, appName, isAppCapturing } = useAppSelector((state) => state.app);

  function startCaptureEvent(): void {
    const durationElement = document.getElementById(
      'duration',
    ) as HTMLInputElement;
    const graphTypeElement = document.getElementById(
      'graphType',
    ) as HTMLInputElement;
    if (durationElement) {
      const durationString: string = durationElement.value;
      const duration = Number(durationString);
      const graphType: string = graphTypeElement.value;
      const func = () => {
        dispatch(setAppCapturing(true));
        return dispatch(
          startCapture({
            pid,
            duration,
            appName,
            graphType,
          }),
        );
      };
      func()
        .then(async () => {
          dispatch(setAppCapturing(false));
          await dispatch(fetchAllCaptures());
        })
        .catch((err) => {
          console.log('Error in Start Capture onclick event: ', err);
        });
    }
  }
  return (
    <Form>
      <h4>Predetermined Capture Length</h4>
      <Stack direction="horizontal" gap={3}>
        <Form.Group className="mb-3" controlId="duration">
          <Form.Label>Duration of Capture</Form.Label>
          <Form.Control type="text" placeholder="duration in seconds" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="graphType">
          <Form.Label>Type of Graph</Form.Label>
          <Form.Select aria-label="select graph type">
            <option value="flamegraph">Flame Graph</option>
            <option value="icicle">Icicle Graph</option>
          </Form.Select>
        </Form.Group>
      </Stack>
      {!isAppCapturing ? (
        <CapButton variant="success" onClick={() => startCaptureEvent()}>
          Start
        </CapButton>
      ) : (
        <CapButton variant="success" disabled>
          <LabeledSpinner label="Capturing..." />
        </CapButton>
      )}
    </Form>
  );
}

function AppAndCaptureForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const {
    pid, appName, isAppRunning, isAppCapturing,
  } = useAppSelector(
    (state) => state.app,
  );

  function AppAndCapHandler() {
    // grab duration
    console.log('click the start capture button');
    const durationElement = document.getElementById(
      'durationCombo',
    ) as HTMLInputElement;
    const graphTypeElement = document.getElementById(
      'graphTypeCombo',
    ) as HTMLInputElement;
    const filePathElement = document.getElementById(
      'filepathCombo',
    ) as HTMLInputElement;
    if (durationElement) {
      const durationString: string = durationElement.value;
      const duration = Number(durationString);
      const graphType: string = graphTypeElement.value;
      const filePath: string = filePathElement.value;
      console.log(duration);
      console.log('pid is', pid);
      const func = () => {
        dispatch(setAppCapturing(true));
        return dispatch(
          startAppAndCapture({
            filePath,
            duration,
            appName,
            graphType,
          }),
        );
      };
      func()
        .then(async () => {
          dispatch(setAppCapturing(false));
          await dispatch(fetchAllCaptures());
        })
        .catch((err) => {
          console.log('Error in Start Capture onclick event: ', err);
        });
    }
  }

  return (
    <>
      <h4>Start an App and a Capture at the same time!</h4>
      <Stack direction="horizontal" gap={3}>
        <Form.Group className="mb-3" controlId="durationCombo">
          <Form.Label>Duration of Capture</Form.Label>
          <Form.Control type="text" placeholder="duration in seconds" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="graphTypeCombo">
          <Form.Label>Type of Graph</Form.Label>
          <Form.Select aria-label="select graph type">
            <option value="flamegraph">Flame Graph</option>
            <option value="icicle">Icicle Graph</option>
          </Form.Select>
        </Form.Group>
      </Stack>

      <Col>
        <Form.Group className="mb-3" controlId="filepathCombo">
          <Form.Label>App Relative Filepath</Form.Label>
          <Form.Control
            type="text"
            defaultValue="../../src/examples/app-test.js"
          />
          <Form.Text className="text-muted">
            Please enter the relative Filepath.
          </Form.Text>
        </Form.Group>
      </Col>
      <Col>
        {!isAppRunning && !isAppCapturing ? (
          <CapButton variant="success" onClick={() => AppAndCapHandler()}>
            Start
          </CapButton>
        ) : (
          <CapButton variant="success" disabled>
            <LabeledSpinner label="Running..." />
          </CapButton>
        )}
      </Col>
    </>
  );
}

function ManualCaptureForm(): JSX.Element {
  // const dispatch = useAppDispatch();
  const { isAppCapturing } = useAppSelector((state) => state.app);
  return (
    <>
      <h4>Custom Length Capture</h4>
      <div className="d-grid gap-2">
        <div className="row">
          <div className="col-6">
            {!isAppCapturing ? (
              <CapButton variant="success">Start</CapButton>
            ) : (
              <CapButton variant="success" disabled>
                <LabeledSpinner label="Capturing..." />
              </CapButton>
            )}
          </div>
          <div className="col-6" />
        </div>
        <div className="row">
          <div className="col-6">
            <CapButton variant="danger" disabled={!isAppCapturing}>
              Stop
            </CapButton>
          </div>
          <div className="col-6" />
        </div>
      </div>
    </>
  );
}

export default function CapturePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { pid, isAppRunning } = useAppSelector((state) => state.app);
  const [appId, setAppId] = useState<number | null>(null);
  const [capId, setCapId] = useState<number | null>(null);
  useEffect(() => {
    dispatch(setActivePage('/capture'));
  });

  useEffect(() => {
    if (isAppRunning) {
      const newAppId = setInterval(
        () => dispatch(checkIsAppRunning(pid)),
        1000,
      );
      setAppId(Number(newAppId));
    } else {
      if (appId) clearInterval(appId);
      if (capId) clearInterval(capId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAppRunning]);

  // useEffect(() => {
  //   if (isAppCapturing) {
  //     const newCapId = setInterval(() => dispatch(checkIsAppCapturing()), 1000);
  //     setCapId(Number(newCapId));
  //   } else if (capId) {
  //     clearInterval(capId);
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isAppCapturing]);

  return (
    <Stack direction="horizontal" gap={3} className="mb-5">
      <ListSidebar />
      <Stack>
        <Card className="w-100">
          <Tab.Container defaultActiveKey="basic">
            <Card.Header>
              <Nav variant="tabs" defaultActiveKey="basic">
                <Nav.Item>
                  <Nav.Link eventKey="basic">Basic</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="advanced">Advanced</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Tab.Content>
              <Tab.Pane eventKey="basic">
                <Stack direction="vertical" gap={3} className="p-3">
                  <AppAndCaptureForm />
                </Stack>
              </Tab.Pane>
              <Tab.Pane eventKey="advanced">
                <Stack direction="vertical" gap={3} className="p-3">
                  <RunApplicationForm />
                  <hr />
                  <FixedLengthCaptureForm />
                  <hr />
                  <ManualCaptureForm />
                </Stack>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Card>
      </Stack>
    </Stack>
  );
}
