import React, { SyntheticEvent } from 'react';
import { Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import HistoryFileItem from './HistoryFileItem';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setCurrent } from '../../store/captureSlice';
// import { Capture } from '../../store/captureSlice';

// type MetaDataType = {
//   id: number,
//   date: Date,
//   name: string,

// };

// type HistorySidebarProps = {
//   captureList: captureListType[],
//   display: (event: SyntheticEvent) => void
// };
export default function HistorySidebar() {
  const { current, captureList } = useAppSelector((state) => state.captures);
  const dispatch = useAppDispatch();

  // const { captureList, display } = props;

  // const remove = (name: string) {
  //   //
  // }

  const HistoryFileLists: JSX.Element[] = [];
  console.log('captureList', captureList);
  for (let i = 0; i < captureList.length; i++) {
    HistoryFileLists.push(<HistoryFileItem
      name={captureList[i].captureName}
      display={(e) => dispatch(setCurrent(captureList[i].id))} /* remove={remove} */
      key={i}
      id={captureList[i].id}
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
