import React from 'react';
import Stack from 'react-bootstrap/Stack';
import ManageSidebar from './ManageSidebar';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import ProgressCard from '../../components/layout/ProgressCard';
import ManageForm from './ManageForm';
import { setActivePage } from '../../store/configSlice';

export default function ManagePage(): JSX.Element {
  const dispatch = useAppDispatch();
  dispatch(setActivePage('/manage'));
  const { file, loading, progress } = useAppSelector((state) => state.upload);

  return (
    <Stack direction="horizontal" gap={3}>
      <ManageSidebar />
      {!loading ? <ManageForm /> : <ProgressCard fileName={file} progress={progress} />}
    </Stack>
  );
}
