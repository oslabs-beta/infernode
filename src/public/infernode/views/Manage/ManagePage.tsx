import React from 'react';
import Stack from 'react-bootstrap/Stack';
import ManageSidebar from './ManageSidebar';
import { useAppSelector } from '../../store/hooks';
import ProgressCard from '../../components/layout/ProgressCard';
import ManageForm from './ManageForm';

export default function ManagePage(): JSX.Element {
  const { file, loading, progress } = useAppSelector((state) => state.upload);

  return (
    <Stack direction="horizontal" gap={3}>
      <ManageSidebar />
      {!loading ? <ManageForm /> : <ProgressCard fileName={file} progress={progress} />}
    </Stack>
  );
}
