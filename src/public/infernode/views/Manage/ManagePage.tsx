import React from 'react';
import Stack from 'react-bootstrap/Stack';
import ManageSidebar from './ManageSidebar';
import { useAppSelector } from '../../store/hooks';
import ProgressCard from '../../components/layout/ProgressCard';
import ManageForm from './ManageForm';

export default function ManagePage(): JSX.Element {
  const { file, loading, progress } = useAppSelector((state) => state.upload);

  const submitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log('submitEvent');
    console.log(event);
    const fileElement: HTMLInputElement | null = document.getElementById('captureFile') as HTMLInputElement;
    if (fileElement !== null && fileElement.files && fileElement.files.length === 1) {
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
    axios.post('/api/captures/flamegraph', formData, {
      onUploadProgress: (progressEvent: ProgressEvent) => {
        const loaded: number = progressEvent.loaded ? Number(progressEvent.loaded) : 0;
        const total: number = progressEvent.total ? Number(progressEvent.total) : 100;
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
    <Stack direction="horizontal" gap={3}>
      <ManageSidebar />
      {!loading ? <ManageForm /> : <ProgressCard fileName={file} progress={progress} />}
    </Stack>
  );
}
