import React from 'react';
import { Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import HistoryFileItem from './HistoryFileItem';

type HistorySidebarProps = {
  // display: (name: string) => Promise<void>
  display: (name: string) => void
}

export default function HistorySidebar(props: HistorySidebarProps) {
  const { display } = props;

  async function getFileLists() {
    const res = await fetch('/api/captures');
    const data: string[] = await res.json();
    return data;
  }
  // const files = getFileLists();
  const files = ['1.svg', '2.svg', '3.svg']; // not meaningful name

  // const remove = (name: string) {
  //   //
  // }

  const historyFileLists: JSX.Element[] = [];
  for (let i = 0; i < files.length; i++) {
    historyFileLists.push(<HistoryFileItem name={files[i]} display={display} /* remove={remove} */ key={i} id ={i}/>);
  }

  return (
    <Card className="align-self-start">
      {/* <img alt="mock history page menu" src="/mocks/history-menu.png" /> */}
      <Form>
        <Form.Group>
          <Form.Label>History</Form.Label>
          {historyFileLists}
        </Form.Group>
      </Form>
    </Card>
  );
}
