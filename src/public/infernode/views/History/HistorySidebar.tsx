import React, { SyntheticEvent } from 'react';
import { Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import HistoryFileItem from './HistoryFileItem';

type MetaDataType = {
  id: number,
  date: string,
  name: string,

};

type HistorySidebarProps = {
  metaData: MetaDataType[],
  display: (event: SyntheticEvent) => void
};
export default function HistorySidebar(props: HistorySidebarProps) {
  const { metaData, display } = props;



  // const remove = (name: string) {
  //   //
  // }

  const HistoryFileLists: JSX.Element[] = [];
  console.log('metadata', metaData);
  for (let i = 0; i < metaData.length; i++) {
    HistoryFileLists.push(<HistoryFileItem
      name={metaData[i].name}
      display={display} /* remove={remove} */
      key={i}
      id={metaData[i].id}
      date={metaData[i].date}
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
