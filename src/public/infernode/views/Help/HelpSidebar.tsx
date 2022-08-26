import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

export default function HelpSidebar(): JSX.Element {
  return (
    <Card className="flex-shrink-0 align-self-start">
      <ListGroup as="ul">
        <ListGroup.Item as="li">
          <LinkContainer to="/help/flamegraphs">
            <Nav.Link>Flamegraphs</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/help/perf">
            <Nav.Link>Perf Tools</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/help/profiling">
            <Nav.Link>Node.js Profiling</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/help/resources">
            <Nav.Link>More Resources</Nav.Link>
          </LinkContainer>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}
