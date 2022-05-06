import React, { useEffect } from 'react';
import { Typography } from '@mui/material';

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
  timerActive, updateMode, setTimeLeft, timeLeft,
}) {
  const delayInMilliseconds = 1000;

  // ----------------------------
  // Functions to manage react state
  // ----------------------------
  const countDown = () => {
    if (timerActive && timeLeft > 0) {
      setTimeLeft(timeLeft - delayInMilliseconds);
    }
    if (timeLeft <= 0) updateMode();
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
