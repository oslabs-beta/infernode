import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import {
  login,
  logout,
  updatePassword,
  updateUsername,
  togglePopover,
} from '../../../store/userSlice';

export function LoginButton(): JSX.Element {
  const { features } = useAppSelector((state) => state.config);
  const { popover } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  if (!features.loginUi) return <div />;

  return (
    <OverlayTrigger
      key="login"
      placement="bottom"
      show={popover}
      overlay={(
        <Popover id="login-popover">
          <Popover.Header> INFERNOde Account</Popover.Header>
          <Popover.Body>
            <Form>
              <Form.Control
                type="text"
                id="inputUsername"
                onChange={(e) => dispatch(updateUsername(`${e.target.value}`))}
                placeholder="username"
              />
              <Form.Control
                type="password"
                id="inputPassword"
                placeholder="password"
                onChange={(e) => dispatch(updatePassword(`${e.target.value}`))}
              />
              <Button onClick={() => dispatch(login())}>Submit</Button>
            </Form>
          </Popover.Body>
        </Popover>
        )}
    >
      <Button onClick={() => dispatch(togglePopover())} className="mx-2">Login</Button>
    </OverlayTrigger>
  );
}

export function LogoutButton(): JSX.Element {
  const { features } = useAppSelector((state) => state.config);
  const { popover, username } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  if (!features.loginUi) return <div />;

  return (
    <OverlayTrigger
      key="logout"
      placement="bottom"
      show={popover}
      overlay={(
        <Popover id="login-popover">
          <Popover.Header> INFERNOde Account</Popover.Header>
          <Popover.Body>
            {username && `Logged in as: ${username}`}
            <Button onClick={() => dispatch(logout())}>Logout</Button>
          </Popover.Body>
        </Popover>
      )}
    >
      <Button variant="secondary" onClick={() => dispatch(togglePopover())} className="mx-2">{username}</Button>
    </OverlayTrigger>
  );
}
