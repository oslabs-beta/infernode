import React from 'react';
import Container from 'react-bootstrap/Container';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { toggleDarkMode } from '../../../store/configSlice';
import { LoginButton, LogoutButton } from './Login';

export default function NavBar(): JSX.Element {
  const isDarkMode = useAppSelector((state) => state.config.darkMode);
  const { authenticated } = useAppSelector((state) => state.user);
  const { activePage } = useAppSelector((state) => state.config);
  const dispatch = useAppDispatch();

  let bg = 'light';
  let variant = 'light';
  if (isDarkMode) {
    bg = 'dark';
    variant = 'dark';
  }

  return (
    <Navbar expand="md" sticky="top" bg={bg} variant={variant} className="mb-2">
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
          <Nav activeKey={activePage} className="me-auto">
            <LinkContainer to="/history">
              <Nav.Link>History</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/differential">
              <Nav.Link>Differentials</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/capture">
              <Nav.Link>Capture</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/upload">
              <Nav.Link>Upload</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/help">
              <Nav.Link>Help</Nav.Link>
            </LinkContainer>
          </Nav>
          <ButtonGroup className="mx-2">
            <ToggleButton
              id="toggle-check"
              type="checkbox"
              variant="secondary"
              checked={isDarkMode}
              value="1"
              onChange={() => dispatch(toggleDarkMode())}
            >
              {(isDarkMode && '🌔') || '🌒'}
            </ToggleButton>
            {(authenticated && <LogoutButton />) || <LoginButton />}
          </ButtonGroup>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
