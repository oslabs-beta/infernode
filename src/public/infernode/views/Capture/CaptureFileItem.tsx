import React, { SyntheticEvent } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

type CaptureFileItemProps = {
  name: string,
  display: (event: SyntheticEvent) => void,
};

export default function CaptureFileItem(props: CaptureFileItemProps) {
  const {
    name,
    display,
    // date,
  } = props;
  return (
    <div className="flex-box">
      <Form.Text>{name}</Form.Text>
      <Button variant="primary" onClick={display}>Display</Button>
      <Button variant="secondary">Manage</Button>
    </div>
  );
}
