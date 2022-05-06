import React from 'react';
import {
  Box, Checkbox, Tooltip, IconButton,
} from '@mui/material';
import {
  PlayCircleRounded, PauseCircleRounded, RestoreRounded, SkipNextRounded,
} from '@mui/icons-material/';

export default function TimerButtons({
  timerActive, setTimerActive, updateTimeOnMode, updateMode,
}) {
  // ----------------------------
  // Functions to manage react state
  // ----------------------------
  const resetTimer = () => { setTimerActive(false); updateTimeOnMode(); };

  const updateTimer = () => setTimerActive(!timerActive);

  return (
    <Box sx={{
      py: 1.5,
      px: 3.5,
      mt: 4,
      mb: 8,
      textAlign: 'center',
      borderRadius: 50,
      borderWidth: 3,
      borderStyle: 'solid',
      borderColor: 'primary.main',
      backgroundColor: 'secondary.main',
    }}
    >
      <Tooltip
        title={timerActive ? 'Pause timer' : 'Start timer'}
        placement="bottom-end"
      >
        <Checkbox
          size="large"
          checked={timerActive}
          onChange={updateTimer}
          icon={<PlayCircleRounded color="primary" />}
          checkedIcon={<PauseCircleRounded color="warning" />}
        />
      </Tooltip>
      <Tooltip title="Reset timer" placement="bottom">
        <IconButton onClick={resetTimer}>
          <RestoreRounded color="primary" fontSize="large" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Skip to next session" placement="bottom-start">
        <IconButton onClick={updateMode}>
          <SkipNextRounded color="primary" fontSize="large" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
