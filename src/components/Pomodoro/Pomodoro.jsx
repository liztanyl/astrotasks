import React, { useState, useEffect } from 'react';
import { Stack, Box } from '@mui/material';
import Timer from './Timer.jsx';
import TimerButtons from './TimerButtons.jsx';
import CurrentTaskContainer from './CurrentTaskContainer.jsx';

const minsToMilliseconds = (mins) => mins * 60 * 1000;

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
  // borderWidth: 3,
  // borderStyle: 'solid',
  // borderColor: 'primary.main',
  backgroundColor: 'primary.main',
  color: 'white',
};

const breakStyle = {
  borderWidth: 3,
  borderStyle: 'solid',
  borderColor: 'primary.main',
  backgroundColor: 'none',
  color: 'auto',
};

export default function Pomodoro({
  timeLeft, setTimeLeft, currentTask, timerActive, setTimerActive,
}) {
  const WORK = 'work';
  const SHORTBREAK = 'short break';
  const LONGBREAK = 'long break';
  const modeList = [
    WORK, SHORTBREAK,
    WORK, SHORTBREAK,
    WORK, SHORTBREAK,
    WORK, LONGBREAK,
  ];

  // ----------------------------
  // State variables
  // ----------------------------
  const [mode, setMode] = useState(modeList);

  // ----------------------------
  // Functions to manage react state
  // ----------------------------
  const updateMode = () => {
    const newMode = [...mode];
    newMode.push(newMode.shift());
    setMode(newMode);
    setTimerActive(false);
  };

  const updateTimeOnMode = () => {
    let minutes = 0.2;
    if (mode[0] === WORK) minutes = 25;
    if (mode[0] === SHORTBREAK) minutes = 5;
    if (mode[0] === LONGBREAK) minutes = 20;
    setTimeLeft(minsToMilliseconds(minutes));
  };

  useEffect(() => { updateTimeOnMode(); }, [mode]);

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ height: '100%' }}
    >
      <Timer
        timerActive={timerActive}
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        updateTimeOnMode={updateTimeOnMode}
      />
      <TimerButtons
        timerActive={timerActive}
        setTimerActive={setTimerActive}
        updateTimeOnMode={updateTimeOnMode}
        updateMode={updateMode}
      />
      <Box sx={[noCurrentTaskStyle,
        currentTask && mode[0] === WORK && currentTaskStyle,
        mode[0] !== WORK && breakStyle]}
      >
        {currentTask && <CurrentTaskContainer currentTask={currentTask} mode={mode} />}
      </Box>
    </Stack>
  );
}
