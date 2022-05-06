import React from 'react';
import { Typography } from '@mui/material';

export default function CurrentTaskContainer({ currentTask, mode }) {
  return (
    <Typography variant="button" fontSize="large">
      {mode[0] === 'work' ? currentTask.name : 'Time to take a break'}
    </Typography>
  );
}
