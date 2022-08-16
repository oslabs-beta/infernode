import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Navbar from 'react-bootstrap/Navbar';

export const NavBar: React.FC = () => {
  const [isDarkMode, setDarkMode] = useState<boolean>(false);

  let bg: string = 'light';
  let variant: string = 'light';
  if (isDarkMode) {
    bg = 'dark';
    variant = 'dark';
  }
  return (
    <>
      <Navbar bg={bg} variant={variant} className='mb-2'>
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="INFERNOde logo"
            />
            INFERNOde
          </Navbar.Brand>
          <img src='/mocks/navbar-buttons.png' height='30px' width='400px'/>
          <ButtonGroup className="mb-2">
            <ToggleButton
              id="toggle-check"
              type="checkbox"
              variant="secondary"
              checked={isDarkMode}
              value="1"
              onChange={(e) => setDarkMode(e.currentTarget.checked)}
            >
              {isDarkMode && '🌔' || '🌒' }
            </ToggleButton>
          </ButtonGroup>
        </Container>
      </Navbar>
    </>
  );
}
