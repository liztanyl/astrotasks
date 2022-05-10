import React, { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import Timer from './Timer.jsx';
import TimerButtons from './TimerButtons.jsx';
import CurrentTaskContainer from './CurrentTaskContainer.jsx';

const minsToMilliseconds = (mins) => mins * 60 * 1000;

export default function Pomodoro({
  loggedIn, timeLeft, setTimeLeft, currentTask, setCurrentTask, timerActive, setTimerActive,
}) {
  const WORK = 'work';
  const SHORTBREAK = 'short break';
  const LONGBREAK = 'long break';
  const WORKDEMO = 'work demo';
  const SHORTBREAKDEMO = 'short break demo';
  const modeList = [
    WORK, SHORTBREAK,
    WORK, SHORTBREAK,
    WORKDEMO, SHORTBREAKDEMO,
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
    let minutes = 0;
    if (mode[0] === WORK) minutes = 25;
    if (mode[0] === SHORTBREAK) minutes = 5;
    if (mode[0] === LONGBREAK) minutes = 20;
    if (mode[0] === WORKDEMO) minutes = 0.1;
    if (mode[0] === SHORTBREAKDEMO) minutes = 0.1;
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
        setTimerActive={setTimerActive}
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        mode={mode}
        updateMode={updateMode}
      />
      <TimerButtons
        timerActive={timerActive}
        setTimerActive={setTimerActive}
        updateTimeOnMode={updateTimeOnMode}
        updateMode={updateMode}
      />
      <CurrentTaskContainer
        mode={mode}
        loggedIn={loggedIn}
        currentTask={currentTask}
        setCurrentTask={setCurrentTask}
        setTimerActive={setTimerActive}
      />
    </Stack>
  );
}
