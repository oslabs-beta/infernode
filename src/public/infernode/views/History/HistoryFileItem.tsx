import React, { SyntheticEvent } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

type HistoryFileItemProps = {
  name: string,
  display: (event: SyntheticEvent) => void,
  remove: (event: SyntheticEvent) => void,
  date: Date
};

export default function HistoryFileItem(props: HistoryFileItemProps) {
  const {
    name,
    display,
    remove,
    date,
  } = props;
  return (
    <div className="flex-box">
      <Form.Text>{name}</Form.Text>
      <Form.Text>{new Date(date).toLocaleString()}</Form.Text>
      <Button variant="primary" onClick={display}>Display</Button>
      <Button variant="secondary" onClick={remove}>Remove</Button>
    </div>
  );
}
