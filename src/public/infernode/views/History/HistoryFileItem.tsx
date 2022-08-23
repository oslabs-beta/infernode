import React, { SyntheticEvent } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

type HistoryFileItemProps = {
  name: string,
  display: (event: SyntheticEvent) => void,
  // remove: (name: string) => Promise<void>,
  id: number,
  date: Date
};

export default function HistoryFileItem(props: HistoryFileItemProps) {
  const {
    name,
    display, /* remove, */
    id,
    date,
  } = props;
  return (
    <div className="flex-box">
      <Form.Text>{name}</Form.Text>
      <Form.Text>{new Date(date).toLocaleString()}</Form.Text>
      <Button variant="primary" onClick={display} id={`display-${id}`}>Display</Button>
      {/* <Button variant="secondary" onClick={() => remove({ name })} id={`remove-${id}`}>
      Remove
      </Button> */}
    </div>
  );
}
