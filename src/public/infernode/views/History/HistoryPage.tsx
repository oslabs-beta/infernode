import React, {
  SyntheticEvent, useCallback, useEffect, useState,
} from 'react';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import HistorySidebar from './HistorySidebar';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setCurrent } from '../../store/captureSlice';

type MetaDataType = {
  id: number,
  date: Date,
  name: string
};

export default function HistoryPage(): JSX.Element {
  const { current } = useAppSelector((state) => state.captures);
  let realid = 0;
  let haveid = false;
  console.log(`Processing updated current item: ${current || 'null'}`);
  if (current !== null) {
    realid = current;
    haveid = true;
  }

  // const dispatch = useAppDispatch();
  // const [id, setId] = useState<number>(0);
  // const [metaData, setMetaData] = useState<MetaDataType[]>([]);

  // 1. request to send back the file list in the database (meata data of the file)

  // useEffect(() => {
  //   console.log('loop', metaData);
  //   fetch('/api/captures/')
  //     .then((res) => res.json())
  //     .then((data) => {
  //     // const newMetaData = data;
  //     // fake data
  //       // console.log('Inside fetch request Use Effect hook');
  //       const newMetaData = [{ id: 1, date: 'Mon Aug 22 2022 15:21:18 GMT-0500 (Central Daylight Time)', name: 'infernode0.0' },
  //        { id: 2, date: 'Mon Aug 22 2022 15:22:18 GMT-0500 (Central Daylight Time)', name: 'infernode0.1' }];
  //       setMetaData(newMetaData);
  //       const newId = metaData[metaData.length - 1].id;
  //       console.log('newId----', newId);
  //       setId(newId);
  //     })
  //     .catch((err) => {
  //       console.log('fetch data err', err);
  //     });
  // }, [metaData]);

  // const display = (event: SyntheticEvent): void => {
  //   console.log(event.currentTarget.id);
  //   const newId = Number(event.currentTarget.id);
  //   // setId(newId);
  // };

  // 2. request to a file with id to show in the iframe (actual file)

  // const id = 'node-example-fg';
  return (
    <Stack direction="horizontal" gap={3}>
      <HistorySidebar />
      <Card>
        {/* <iframe src="node-example-fg.svg" title="flamegraph" width="1000" height="800"/> */}
        {haveid && <iframe src={`/api/captures/${realid}`} title="flamegraph" width="1000" height="800" />}
      </Card>
    </Stack>
  );
}
