import React from 'react';
import { Card } from 'react-bootstrap';

export const ManageSidebar: React.FC = () =>{
  return (
      <Card className="flex-shrink-0 align-self-start">
        <img src='/mocks/manage-menu.png'/>
      </Card>
  );
}