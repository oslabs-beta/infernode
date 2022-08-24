import React from 'react';
import { Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import HistoryFileItem from './HistoryFileItem';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { deleteCapture, setCurrent } from '../../store/captureSlice';

export default function HistorySidebar(): JSX.Element {
  const { captureList, current } = useAppSelector((state) => state.captures);
  const dispatch = useAppDispatch();

  const HistoryFileLists: JSX.Element[] = [];
  console.log('captureList', captureList);
  for (let i = 0; i < captureList.length; i++) {
    HistoryFileLists.push(<HistoryFileItem
      name={captureList[i].captureName}
      display={() => dispatch(setCurrent(captureList[i].id))}
      remove={() => {
        if (current === captureList[i].id && captureList.length > 1) {
          // restrict to delete current displayed capture
          dispatch(setCurrent(captureList[(i + 1) % captureList.length].id));
          dispatch(deleteCapture(captureList[i].id));
        } else if (captureList.length === 1) {
          dispatch(setCurrent(null));
          dispatch(deleteCapture(captureList[i].id));
        }
      }}
      key={i}
      date={captureList[i].date}
    />);
  }

  return (
    <Card className="align-self-start">
      <Form>
        <Form.Group>
          <Form.Label>History</Form.Label>
          {HistoryFileLists}
        </Form.Group>
      </Form>
    </Card>
  );
}
