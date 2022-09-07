import React from 'react';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

export default function HelpSidebar(): JSX.Element {
  return (
    <Card className="flex-shrink-0 align-self-start">
      <Nav variant="pills" defaultActiveKey="/help/flamegraphs" className="flex-column">
        <LinkContainer to="/help/flamegraphs">
          <Nav.Link>Flamegraphs</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/help/perf">
          <Nav.Link>Linux perf</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/help/dtrace">
          <Nav.Link>MacOS dtrace</Nav.Link>
        </LinkContainer>
      </Nav>
    </Card>
  );
}
