import React from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import ManageSidebar from './ManageSidebar';
import { fetchAllCaptures, setLoading } from '../../store/captureSlice';
import { useAppDispatch } from '../../store/hooks';

export default function ManagePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <Stack direction="horizontal" gap={3}>
      <ManageSidebar />
      <Card>
        <form
          onSubmit={(event: React.SyntheticEvent) => {
            const form: HTMLFormElement = event.target as HTMLFormElement;
            console.log('1 Setting loading to true');
            event.preventDefault();
            dispatch(setLoading(true));
            console.log('2 Posting form');
            fetch(form.action, {
              method: form.method,
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
          method="POST"
          action="/api/captures"
          encType="multipart/form-data"
        >
          <input type="file" name="capture" />
          <input type="text" name="captureName" />
          <input type="text" name="appName" />
          <input type="text" name="creator" />
          <input type="submit" />
        </form>
      </Card>
    </Stack>
  );
}
