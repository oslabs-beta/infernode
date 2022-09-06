import React from 'react';
import { Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import HistoryFileItem from './HistoryFileItem';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { deleteCapture, fetchAllCaptures, setCurrent } from '../../store/captureSlice';

export default function HistorySidebar(): JSX.Element {
  const { captureList, current } = useAppSelector((state) => state.captures);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const HistoryFileLists: JSX.Element[] = [];
  console.log('captureList', captureList);
  for (let i = 0; i < captureList.length; i++) {
    HistoryFileLists.push(<HistoryFileItem
      name={captureList[i].captureName}
      display={() => dispatch(setCurrent(captureList[i].id))}
      remove={() => {
        if (current === captureList[i].id && captureList.length > 1) {
          dispatch(setCurrent(captureList[(i + 1) % captureList.length].id));
        } else if (captureList.length === 1) {
          dispatch(setCurrent(null));
        }
        dispatch(deleteCapture(captureList[i])).catch((err) => console.log(`Failed to delete capture: ${JSON.stringify(err)}`));
        dispatch(fetchAllCaptures()).catch((err) => console.log(err));
      }}
      key={i}
      date={captureList[i].date}
    />);
  }
  if (HistoryFileLists.length === 0) navigate('/capture', { replace: true });
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
