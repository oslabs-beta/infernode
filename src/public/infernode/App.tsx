import React from 'react';
import { Container } from 'react-bootstrap';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { NavBar } from './components/layout/NavBar/NavBar';
import { CapturePage } from './views/Capture/CapturePage';
import { HelpPage } from './views/Help/HelpPage';
import HelpPages from './views/Help/HelpPages';
import { HistoryPage } from './views/History/HistoryPage';
import { ManagePage } from './views/Manage/ManagePage';

// function App(): JSX.Element {
const App = () => {
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
          <Route index element={<HelpPages.HelpPage1 />} />
          <Route path="page1" element={<HelpPages.HelpPage1 />} />
          <Route path="page2" element={<HelpPages.HelpPage2 />} />
          <Route path="page3" element={<HelpPages.HelpPage3 />} />
          <Route path="page4" element={<HelpPages.HelpPage4 />} />
          <Route path="page5" element={<HelpPages.HelpPage5 />} />
          <Route path="page6" element={<HelpPages.HelpPage6 />} />
          <Route path="page7" element={<HelpPages.HelpPage7 />} />
        </Route>
        <Route path="*" element={<HistoryPage />} />
      </Routes>
    </Container>
  </>
  );
}

export default App;
