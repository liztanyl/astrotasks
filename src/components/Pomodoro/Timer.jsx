import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { sendAlert } from '../../helper-functions/helperFunctions.mjs';

const formatTimer = (ms) => {
  // calculate minutes & seconds
  let min = Math.floor((ms / 1000 / 60) % 60);
  let sec = Math.floor((ms / 1000) % 60);

  // add leading 0
  if (min < 10) min = `0${min}`;
  if (sec < 10) sec = `0${sec}`;

  // Show min:sec
  return `${min}:${sec}`;
};

export default function Timer({
  timerActive, setTimerActive, mode, updateMode, setTimeLeft, timeLeft,
}) {
  const delayInMilliseconds = 1000;

  // ----------------------------
  // Functions to manage react state
  // ----------------------------
  const countDown = () => {
    if (timerActive && timeLeft > 0) {
      setTimeLeft(timeLeft - delayInMilliseconds);
    }
    if (timeLeft <= 0) {
      mode[0] === 'work' || mode[0] === 'work demo'
        ? sendAlert(setTimerActive, 'break')
        : sendAlert(setTimerActive, 'work');
      updateMode();
    }
  };

  useEffect(() => {
    const timer = setTimeout(countDown, delayInMilliseconds);
    return () => { clearTimeout(timer); };
  });

  return (
    <Typography variant="h2">
      {formatTimer(timeLeft)}
    </Typography>
  );
}
