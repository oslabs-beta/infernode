import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

export default function NavBar(): JSX.Element {
  const [isDarkMode, setDarkMode] = useState(false);

  let bg = 'light';
  let variant = 'light';
  if (isDarkMode) {
    bg = 'dark';
    variant = 'dark';
  }

  return (
    <Navbar bg={bg} variant={variant} className="mb-2">
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
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/history">
              <Nav.Link>History</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/capture">
              <Nav.Link>Capture</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/manage">
              <Nav.Link>Manage</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/help">
              <Nav.Link>Help</Nav.Link>
            </LinkContainer>
          </Nav>
          <ButtonGroup className="mb-2">
            <ToggleButton
              id="toggle-check"
              type="checkbox"
              variant="secondary"
              checked={isDarkMode}
              value="1"
              onChange={() => setDarkMode(!isDarkMode)}
            >
              {(isDarkMode && '🌔') || '🌒'}
            </ToggleButton>
          </ButtonGroup>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
