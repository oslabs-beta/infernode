import React, { useEffect } from 'react';
import Stack from 'react-bootstrap/Stack';
import ListSidebar from '../../components/layout/ListSidebar';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import ProgressCard from '../../components/layout/ProgressCard';
import UploadForm from './UploadForm';
import { setActivePage } from '../../store/configSlice';

export default function UploadPage(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActivePage('/upload'));
  });

  const { file, loading, progress } = useAppSelector((state) => state.upload);

  return (
    <Stack direction="horizontal" gap={3}>
      <ListSidebar />
      {!loading ? <UploadForm /> : <ProgressCard fileName={file} progress={progress} />}
    </Stack>
  );
}
