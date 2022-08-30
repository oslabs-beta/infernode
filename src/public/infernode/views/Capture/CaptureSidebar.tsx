import React from 'react';
import { Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import CaptureFileItem from './CaptureFileItem';

export default function CaptureSidebar(): JSX.Element {
  const captureList = [{ captureName: 'Test 1' }, { captureName: 'Test 2' }];
  const CaptureFileList: JSX.Element[] = [];
  for (let i = 0; i < captureList.length; i++) {
    CaptureFileList.push(<CaptureFileItem
      name={captureList[i].captureName}
      display={() => console.log('pressed button')}
      key={i}
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
      {/* <img alt="mock capture page menu" src="/mocks/capture-menu.png" /> */}
    </Card>
  );
}
