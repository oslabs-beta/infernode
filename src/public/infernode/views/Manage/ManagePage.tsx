import React from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ManageSidebar from './ManageSidebar';
import { fetchAllCaptures, setLoading } from '../../store/captureSlice';
import { useAppDispatch } from '../../store/hooks';

export default function ManagePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <Stack direction="horizontal" gap={3}>
      <ManageSidebar />
      <Card className="w-100">
        <Form
          onSubmit={(event: React.SyntheticEvent) => {
            console.log('Form event:');
            console.log(event);
            const form: HTMLFormElement = event.target as HTMLFormElement;
            console.log('Form:');
            console.log(form);
            console.log('1 Setting loading to true');
            event.preventDefault();
            dispatch(setLoading(true));
            console.log('2 Posting form');
            fetch('/api/captures', {
              method: 'POST',
              body: new FormData(form),
            })
              .then(() => {
                console.log('3 Setting timeout and waiting for 2 seconds');
                setTimeout(() => {
                  console.log('4 Timeout over, setting loading to false');
                  dispatch(setLoading(false));
                  console.log('5 Fetching updated capture list');
                  dispatch(fetchAllCaptures()).then(() => {
                    console.log('6 Redirecting to history page');
                    navigate('/');
                  }).catch((err: Error) => console.log(JSON.stringify(err)));
                }, 2000);
              })
              .catch((err) => console.log(`uploading files info unfulfilled: ${JSON.stringify(err)}`));
          }}
          id="uploadForm"
          encType="multipart/form-data"
        >
          <Form.Group controlId="capture">
            <Form.Label>Capture file</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Form.Group controlId="captureName">
            <Form.Label>Capture name</Form.Label>
            <Form.Control type="text" placeholder="trace slow function" />
          </Form.Group>
          <Form.Group controlId="appName">
            <Form.Label>Application name</Form.Label>
            <Form.Control type="text" placeholder="NodeApp.js" />
          </Form.Group>
          <Form.Group controlId="creator">
            <Form.Label>Creator</Form.Label>
            <Form.Control type="text" placeholder="anonymous" />
          </Form.Group>
          {/* <input type="file" name="capture" /> */}
          {/* <input type="text" name="captureName" /> */}
          {/* <input type="text" name="appName" /> */}
          {/* <input type="text" name="creator" /> */}
          <Button variant="primary" type="submit">Upload</Button>
        </Form>
      </Card>
    </Stack>
  );
}
