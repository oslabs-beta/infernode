import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar/NavBar';
import CapturePage from './views/Capture/CapturePage';
import HelpPage from './views/Help/HelpPage';
import * as HelpPages from './views/Help/HelpPages';
import HistoryPage from './views/History/HistoryPage';
import UploadPage from './views/Upload/UploadPage';
import { useAppDispatch } from './store/hooks';
import { fetchAllCaptures } from './store/captureSlice';

export default function App(): JSX.Element {
  const dispatch = useAppDispatch();

  // Get capture list once on app mount
  useEffect(() => {
    async function initialCaptureLoad(): Promise<void> { await dispatch(fetchAllCaptures()); }
    // eslint-disable-next-line no-console
    initialCaptureLoad().catch((err) => console.log('Error: failed to fetch data on App mount: ', err));
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <Container>
        <Routes>
          <Route index element={<HistoryPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="capture" element={<CapturePage />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="help" element={<HelpPage />}>
            <Route index element={<HelpPages.HelpFlamegraphs />} />
            <Route path="flamegraphs" element={<HelpPages.HelpFlamegraphs />} />
            <Route path="perf" element={<HelpPages.HelpPerf />} />
            <Route path="dtrace" element={<HelpPages.HelpDtrace />} />
          </Route>
          <Route path="*" element={<HistoryPage />} />
        </Routes>
      </Container>
      <Container fluid className="fixed-bottom bg-light p-2">
        <Row>
          <Col sm="auto" className="text-muted">v1.0.0</Col>
          <Col />
          <Col sm="auto" className="text-right"><a href="https://www.infernode.dev/">infernode.dev</a></Col>
        </Row>
      </Container>
    </>
  );
}
