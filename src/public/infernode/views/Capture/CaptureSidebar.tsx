import React from 'react';
import { Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import CaptureFileItem from './CaptureFileItem';
import { useAppSelector } from '../../store/hooks';

export default function CaptureSidebar(): JSX.Element {
  const { features } = useAppSelector((state) => state.config);
  const { captureList } = useAppSelector((state) => state.captures);
  if (!features.captureSidebar) return <div />;

  const CaptureFileList: JSX.Element[] = [];
  for (let i = 0; i < captureList.length; i++) {
    CaptureFileList.push(<CaptureFileItem
      name={captureList[i].captureName}
      display={() => console.log('pressed button')}
      key={i}
      date={captureList[i].date}
    />);
  }

  return (
    <Card className="flex-shrink-0 align-self-start">
      <Form>
        <Form.Group>
          <Form.Label>Captures</Form.Label>
          <p>Here are current Captures</p>
          {CaptureFileList}
        </Form.Group>
      </Form>
    </Card>
  );
}
