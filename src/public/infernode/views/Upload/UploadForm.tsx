import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setFile,
  updateCaptureName,
  updateAppName,
  updateCreator,
  updateDate,
  updateData,
  setLoading,
  setProgress,
} from '../../store/uploadSlice';
import { fetchAllCaptures } from '../../store/captureSlice';

export default function UploadForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formData = new FormData();
  const {
    appName,
    captureName,
    creator,
    date,
    data,
  } = useAppSelector(
    (state) => state.upload.capture,
  );

  const submitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log('submitEvent');
    // console.log(event);
    const graphTypeElement = document.getElementById('graphType') as HTMLInputElement;
    const graphType: string = graphTypeElement.value;
    const fileElement = document.getElementById(
      'captureFile',
    ) as HTMLInputElement;
    if (fileElement?.files?.length === 1) {
      formData.append('captureFile', fileElement.files[0]);
      dispatch(setFile(fileElement.files[0].name));
    } else {
      console.log('No file selected...');
      return;
    }
    formData.append('captureName', captureName);
    formData.append('appName', appName);
    formData.append('creator', creator);
    formData.append('date', date);
    formData.append('data', data);
    dispatch(setLoading(true));
    dispatch(setProgress(0));
    axios
      .post(`/api/captures/${graphType}`, formData, {
        onUploadProgress: (progressEvent: ProgressEvent) => {
          const loaded: number = progressEvent.loaded
            ? Number(progressEvent.loaded)
            : 0;
          const total: number = progressEvent.total
            ? Number(progressEvent.total)
            : 100;
          const progressPct: number = Math.round((loaded / total) * 100);
          dispatch(setProgress(progressPct));
        },
      })
      .then(async () => {
        await dispatch(fetchAllCaptures());
        dispatch(setLoading(false));
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card className="w-100">
      <Form onSubmit={submitForm} id="uploadForm">
        <Form.Group controlId="captureFile" className="m-3">
          <Form.Label>Capture file</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        <Form.Group controlId="data" className="m-3">
          <Form.Label>Graph Type</Form.Label>
          <Form.Select aria-label="Default select example" id="graphType">
            <option value="flamegraph">Capture a Flamegraph!</option>
            <option value="icicle">Capture an Icegraph!</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="captureName" className="m-3">
          <Form.Label>Capture name</Form.Label>
          <Form.Control
            type="text"
            placeholder="trace slow function"
            onChange={(e) => dispatch(updateCaptureName(e.target.value))}
          />
        </Form.Group>
        <Form.Group controlId="appName" className="m-3">
          <Form.Label>Application name</Form.Label>
          <Form.Control
            type="text"
            placeholder="NodeApp.js"
            onChange={(e) => dispatch(updateAppName(e.target.value))}
          />
        </Form.Group>
        <Form.Group controlId="creator" className="m-3">
          <Form.Label>Creator</Form.Label>
          <Form.Control
            type="text"
            placeholder="anonymous"
            onChange={(e) => dispatch(updateCreator(e.target.value))}
          />
        </Form.Group>
        <Form.Group controlId="data" className="m-3">
          <Form.Label>Metadata</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => dispatch(updateData(e.target.value))}
          />
        </Form.Group>
        <Form.Group controlId="date" className="m-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="text"
            placeholder={new Date().toLocaleString()}
            onChange={(e) => dispatch(updateDate(e.target.value))}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="m-3">
          Upload
        </Button>
      </Form>
    </Card>
  );
}
