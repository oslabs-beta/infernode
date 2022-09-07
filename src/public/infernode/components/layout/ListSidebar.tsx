import React, { SyntheticEvent } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Pagination from 'react-bootstrap/Pagination';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
  deleteCapture, fetchAllCaptures,
  setCurrent,
} from '../../store/captureSlice';

import { setActiveListPage } from '../../store/configSlice';

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
        className={(active ? 'p-1 fs-6 fw-semibold text-center bg-primary text-light' : 'p-1 fs-6 fw-semibold text-center')}
      >
        {name || 'untitled'}
      </Card.Header>
      <Card.Body className="p-1 fs-6">
        <Card.Text className="lh-1 fs-6">{new Date(date).toLocaleString()}</Card.Text>
      </Card.Body>
      <Card.Footer className="p-1">
        <Stack direction="horizontal">
          <ButtonGroup className="mx-auto">
            <Button className="p-1 fs-6" variant="outline-primary" onClick={display}>Display</Button>
            <Button className="p-1 fs-6" variant="outline-secondary" onClick={remove}>Remove</Button>
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
  const { filters, activeListPage } = useAppSelector((state) => state.config);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const ItemList: JSX.Element[] = [];
  const appNameRegex = new RegExp(filters.appName);
  const captureNameRegex = new RegExp(filters.captureName);
  const creatorRegex = new RegExp(filters.creator);
  const dateRegex = new RegExp(filters.date);

  const perPage = 5;
  const pageStart = perPage * (activeListPage - 1);
  const pageEnd = perPage * (activeListPage);

  // todo: Figure out how to change pages only when current is updated
  // useEffect(() => {
  //   const idxOfCurrent = captureList.findIndex((ele) => ele.id === current);
  //   if (current !== null && (idxOfCurrent < pageStart || idxOfCurrent >= pageEnd)) {
  //     dispatch(setActiveListPage(Math.ceil((idxOfCurrent + 1) / perPage)));
  //   }
  // }, [current])

  for (let i = pageStart; i < captureList.length && i < pageEnd; i++) {
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

  const paginationArray = [];
  for (let i = 1; i <= Math.ceil(captureList.length / 5); i++) {
    paginationArray.push(
      <Pagination.Item
        key={i}
        active={i === activeListPage}
        onClick={() => dispatch(setActiveListPage(i))}
      >
        {i}
      </Pagination.Item>,
    );
  }

  return (
    <Card className="align-self-start flex-grow-0 flex-shrink-0" style={{ width: '240px' }}>
      <Card.Header className="h5">History</Card.Header>
      <Card.Body className="p-1">
        {ItemList}
        <Pagination>
          {paginationArray}
        </Pagination>
      </Card.Body>

    </Card>
  );
}
