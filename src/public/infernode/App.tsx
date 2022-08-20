import React from 'react';
import { Container } from 'react-bootstrap';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar/NavBar';
import CapturePage from './views/Capture/CapturePage';
import HelpPage from './views/Help/HelpPage';
import * as HelpPages from './views/Help/HelpPages';
import HistoryPage from './views/History/HistoryPage';
import ManagePage from './views/Manage/ManagePage';

export default function App(): JSX.Element {
  return (
    <>
      <NavBar />
      <Container>
        <Routes>
          <Route index element={<HistoryPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="capture" element={<CapturePage />} />
          <Route path="manage" element={<ManagePage />} />
          <Route path="help" element={<HelpPage />}>
            <Route index element={<HelpPages.HelpTOC />} />
            <Route path="flamegraphs" element={<HelpPages.HelpFlamegraphs />} />
            <Route path="perf" element={<HelpPages.HelpPerf />} />
            <Route path="profiling" element={<HelpPages.HelpProfiling />} />
            <Route path="resources" element={<HelpPages.HelpResources />} />
          </Route>
          <Route path="*" element={<HistoryPage />} />
        </Routes>
      </Container>
    </>
  );
}
