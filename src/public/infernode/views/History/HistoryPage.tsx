import React, { useState } from 'react';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import HistorySidebar from './HistorySidebar';
import {Fg1, Fg2, Fg3} from './idx';
// reference: https://openbase.com/js/@svgr/webpack
// reference: https://react-svgr.com/docs/webpack/

export default function HistoryPage(): JSX.Element {
  // const [Flamegraph, setFlamegraph] = useState<JSX.Element>(Fg1);
  // // console.log(Flamegraph);
  // const display = (name: string) => {

  //   const fgName = <`Fg${name}`/>;
  //   setFlamegraph(<{fgName} />);
  // };
  // const remove =(name: string): void => {
  //   // remove from the side bar and from the filesystem

  // }
const display = () => {};

  return (
    <Stack direction="horizontal" gap={3}>
      <HistorySidebar display={display} />
      <Card>
        <Fg1 />
      </Card>
    </Stack>
  );
}
