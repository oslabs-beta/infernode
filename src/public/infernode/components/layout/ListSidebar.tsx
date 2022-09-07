import React, { SyntheticEvent } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
  deleteCapture, fetchAllCaptures,
  setCurrent,
} from '../../store/captureSlice';

type SidebarItemProps = {
  name: string,
  display: (event: SyntheticEvent) => void,
  remove: (event: SyntheticEvent) => void,
  date: string
  active: boolean,
};

function SidebarItem(props: SidebarItemProps) {
  const {
    name,
    display,
    remove,
    date,
    active,
  } = props;
  return (
    <Card className="my-1">
      <Card.Header
        className={(active ? 'p-1 fs-6 fw-semibold text-center bg-secondary text-light' : 'p-1 fs-6 fw-semibold text-center')}
      >
        {name || 'untitled'}
      </Card.Header>
      <Card.Body className="p-1 fs-6">
        <Card.Text className="lh-1 fs-6">{new Date(date).toLocaleString()}</Card.Text>
      </Card.Body>
      <Card.Footer className="p-1">
        <Stack direction="horizontal">
          <ButtonGroup className="mx-auto">
            <Button className="p-1 fs-6" variant="primary" onClick={display}>Display</Button>
            <Button className="p-1 fs-6" variant="warning" onClick={remove}>Remove</Button>
          </ButtonGroup>
        </Stack>
      </Card.Footer>
    </Card>
  );
}

export default function ListSidebar(): JSX.Element {
  const {
    captureList,
    current,
  } = useAppSelector((state) => state.captures);
  const { filters } = useAppSelector((state) => state.config);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const ItemList: JSX.Element[] = [];
  for (let i = 0; i < captureList.length; i++) {
    const appNameRegex = new RegExp(filters.appName);
    const captureNameRegex = new RegExp(filters.captureName);
    const creatorRegex = new RegExp(filters.creator);
    const dateRegex = new RegExp(filters.date);
    if (appNameRegex.test(captureList[i].appName)
      && captureNameRegex.test(captureList[i].captureName)
      && dateRegex.test(captureList[i].date)
      && creatorRegex.test(captureList[i].creator)) {
      ItemList.push(<SidebarItem
        name={captureList[i].captureName}
        display={() => {
          dispatch(setCurrent(captureList[i].id));
          navigate('/history', { replace: true });
        }}
        remove={() => {
          dispatch(deleteCapture(captureList[i]))
            .catch((err) => console.log(err));
          dispatch(fetchAllCaptures())
            .catch((err) => console.log(err));
        }}
        key={i}
        date={captureList[i].date}
        active={(current === captureList[i].id)}
      />);
    }
  }
  return (
    <Card className="align-self-start flex-shrink-0 flex-grow-0">
      <Card.Header className="h5">History</Card.Header>
      <Card.Body className="p-1">
        {ItemList}
      </Card.Body>
    </Card>
  );
}
