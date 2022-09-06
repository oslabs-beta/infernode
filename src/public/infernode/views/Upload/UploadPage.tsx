import React, { useEffect } from 'react';
import Stack from 'react-bootstrap/Stack';
import UploadSidebar from './UploadSidebar';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import ProgressCard from '../../components/layout/ProgressCard';
import UploadForm from './UploadForm';
import { setActivePage } from '../../store/configSlice';

export default function UploadPage(): JSX.Element {
  const { uploadSidebar } = useAppSelector((state) => state.config.features);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActivePage('/upload'));
  });

  const { file, loading, progress } = useAppSelector((state) => state.upload);

  return (
    <Stack direction="horizontal" gap={3}>
      { uploadSidebar ? <UploadSidebar /> : <></>}
      {!loading ? <UploadForm /> : <ProgressCard fileName={file} progress={progress} />}
    </Stack>
  );
}
