import React from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

type HistoryFileItemProps = {
  name: string,
  // display: (name: string) => Promise<void>,
  display: (name: string) => void
  // remove: (name: string) => Promise<void>,
  id: number
};

export default function HistoryFileItem(props: HistoryFileItemProps) {
  const { name, display, /* remove, */ id } = props;
  return (
    <div className="flex-box">
      <Form.Text>{name}</Form.Text>
      <Button variant="primary" onClick={() => { display(name)}} id={`diplay-${id}`}>Display</Button>
      {/* <Button variant="secondary" onClick={() => remove({ name })} id={`remove-${id}`}>Remove</Button> */}
    </div>
  );
}
