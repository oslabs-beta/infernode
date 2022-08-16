import React from 'react';
import { Card } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap';


export const HelpSidebar: React.FC = () =>{
  // <Card><img src='/mocks/help-menu.png'/></Card>
  // https://react-bootstrap.github.io/components/list-group/
  // npm i --save-dev @types/react-router-bootstrap
  return (
    <Card>
      <ListGroup as="ul">
        <ListGroup.Item as="li">
          <LinkContainer to="/help/page1">
            <Nav.Link>Page 1</Nav.Link>
         </LinkContainer>
          <LinkContainer to="/help/page2">
            <Nav.Link>Page 2</Nav.Link>
         </LinkContainer>
          <LinkContainer to="/help/page3">
            <Nav.Link>Page 3</Nav.Link>
         </LinkContainer>
          <LinkContainer to="/help/page4">
            <Nav.Link>Page 4</Nav.Link>
         </LinkContainer>
          <LinkContainer to="/help/page5">
            <Nav.Link>Page 5</Nav.Link>
         </LinkContainer>
          <LinkContainer to="/help/page6">
            <Nav.Link>Page 6</Nav.Link>
         </LinkContainer>
          <LinkContainer to="/help/page7">
            <Nav.Link>Page 7</Nav.Link>
         </LinkContainer>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}