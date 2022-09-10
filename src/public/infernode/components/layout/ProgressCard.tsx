import React from 'react';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';

type ProgressCardProps = {
  fileName: string,
  progress: number,
};

export default function ProgressCard(props: ProgressCardProps) {
  const {
    fileName,
    progress,
  } = props;
  return (
    <Card className="w-100">
      <Card.Header>{`Uploading ${fileName}...`}</Card.Header>
      <Card.Body>
        <ProgressBar now={progress} label={`${progress}%`} />
      </Card.Body>
    </Card>
  );
}
