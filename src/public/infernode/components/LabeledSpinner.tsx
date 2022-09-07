import React from 'react';
import {
  Stack,
  Spinner,
} from 'react-bootstrap';

type LabeledSpinnerProps = {
  label?: string,
};

export default function LabeledSpinner(props: LabeledSpinnerProps) {
  const { label } = props;

  return (
    <Stack direction="horizontal" gap={3}>
      <Spinner animation="border" />
      <span>{label}</span>
    </Stack>
  );
}

LabeledSpinner.defaultProps = {
  label: 'Loading...',
};
