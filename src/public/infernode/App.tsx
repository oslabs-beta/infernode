import React, {useState} from 'react';
import { Container } from 'react-bootstrap';
import './App.scss';
import { NavBar } from './components/layout/NavBar/NavBar';
import { CapturePage } from './views/Capture/CapturePage';
import { HelpPage } from './views/Help/HelpPage';
import { HistoryPage } from './views/History/HistoryPage';
import { ManagePage } from './views/Manage/ManagePage';

export const App: React.FC = () => {
  return(
    <>
      <NavBar/>
      <Container>
        {/* Insert React Router outlet here, display only one page */}
        <CapturePage/>
        <HelpPage/>
        <HistoryPage/>
        <ManagePage/>
      </Container>
    </>
  )
}

export default App;