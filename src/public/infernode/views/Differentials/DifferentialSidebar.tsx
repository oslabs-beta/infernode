import React, { SyntheticEvent, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
  deleteCapture, fetchAllCaptures,
  getComparisonCapture,
  setCurrent,
  setComparison,
  removeComparison,
} from '../../store/captureSlice';

import { setActiveListPage } from '../../store/configSlice';

type SidebarItemProps = {
  name: string,
  display: (event: SyntheticEvent) => void,
  remove: (event: SyntheticEvent) => void,
  date: string
  active: boolean,
  id: number
};

function SidebarItem(props: SidebarItemProps) {
  const {
    name,
    display,
    remove,
    date,
    active,
    id,
  } = props;
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    dispatch(setComparison(null));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <Button className="p-1 fs-6" variant="outline-primary" onClick={remove}>Remove</Button>
          </ButtonGroup>
          <Form.Check
            type="checkbox"
            onClick={() => {
              setChecked(!checked);
              console.log('compare id is ', id);
              if (!checked) dispatch(setComparison(id));
              if (checked) dispatch(removeComparison(id));
            }}
          />
        </Stack>
      </Card.Footer>
    </Card>
  );
}

export default function DifferentialSidebar(): JSX.Element {
  const {
    captureList,
    current,
    comparison,
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
    // differentials have prefix 99 as its id, differential page won't show them in the sidebar
    if (captureList[i].data !== 'differential') { // data is type field in the db, values include: flamegraphs, differentials, icicles
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
          id={captureList[i].id}
        />);
      }
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
    <Card className="align-self-start" style={{ width: '240px' }}>
      <Card.Header className="h5">Differential Flamegraph</Card.Header>
      <Card.Body className="p-1">
        <Button
          variant="primary"
          disabled={comparison.length !== 2}
          onClick={() => {
            dispatch(getComparisonCapture(comparison))
              .then(async () => {
                await dispatch(fetchAllCaptures());
              })
              .catch((err) => console.error('dispatch getComparisonsCapture error: ', err));
          }}
        >
          Compare
        </Button>
        {ItemList}
        <Pagination>
          {paginationArray}
        </Pagination>
      </Card.Body>
    </Card>
  );
}
