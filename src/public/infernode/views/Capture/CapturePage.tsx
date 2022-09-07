import React, { useEffect, useState } from 'react';
import {
  Button, Form, Stack, Card,
} from 'react-bootstrap';
import {
  startApp,
  stopApp,
  startCapture,
  checkIsAppRunning,
  setAppCapturing,
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
    <Card className="p-3">
      <Form>
        <h4>Predetermined Capture Length</h4>
        <Stack direction="horizontal" gap={3}>
          <Form.Group className="mb-3" controlId="duration">
            <Form.Label>Duration of Capture</Form.Label>
            <Form.Control
              type="text"
              placeholder="duration in seconds"
            />
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
    </Card>
  );
}

function RunApplicationForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const { pid, isAppRunning } = useAppSelector((state) => state.app);
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
    <Card className="p-3">
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
        {!isAppRunning ? (
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
    </Card>
  );
}

function ManualCaptureForm(): JSX.Element {
  // const dispatch = useAppDispatch();
  const { isAppCapturing } = useAppSelector(
    (state) => state.app,
  );
  return (
    <Card className="p-3">
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
    </Card>
  );
}

export default function CapturePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { pid, isAppRunning } = useAppSelector(
    (state) => state.app,
  );
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
    <Stack direction="horizontal" gap={3}>
      <ListSidebar />
      <Card className="p-3 w-100 bg-light">
        <Stack direction="vertical" gap={3}>
          <RunApplicationForm />
          <FixedLengthCaptureForm />
          <ManualCaptureForm />
        </Stack>
      </Card>
    </Stack>
  );
}
