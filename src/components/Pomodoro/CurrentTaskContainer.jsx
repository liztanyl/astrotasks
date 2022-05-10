import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const noCurrentTaskStyle = {
  height: '25%',
  width: '90%',
  p: 3,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
};

const currentTaskStyle = {
  borderRadius: 1,
  backgroundColor: 'primary.main',
  color: 'white',
};

const breakStyle = {
  borderWidth: 3,
  borderStyle: 'solid',
  borderColor: 'primary.main',
  backgroundColor: 'none',
  color: 'black',
};
export default function CurrentTaskContainer({
  mode, loggedIn, currentTask, setCurrentTask, setTimerActive,
}) {
  const taskName = currentTask ? currentTask.name : 'Time to focus';
  return (
    <>
      <Box sx={[noCurrentTaskStyle,
        (mode[0] === 'work' || mode[0] === 'work demo') && currentTaskStyle,
        (mode[0] !== 'work' && mode[0] !== 'work demo') && breakStyle]}
      >
        <Typography variant="button" fontSize="large">
          {mode[0] === 'work' || mode[0] === 'work demo' ? taskName : 'Take a break'}
        </Typography>
      </Box>
      <Box sx={{
        pt: 1, height: 10,
      }}
      >
        {loggedIn && !currentTask
        && (
        <Typography variant="button" size="small">
          Select a task from the list
        </Typography>
        )}
        {currentTask
        && (
        <Button
          size="small"
          onClick={() => { setCurrentTask(null); setTimerActive(false); }}
        >
          Clear Task
        </Button>
        )}
      </Box>
    </>
  );
}
