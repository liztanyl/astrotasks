import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { Container, Grid, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import SignupLogin from './components/SignupLogin/SignupLogin.jsx';
import TaskListContainer from './components/TaskList/TaskListContainer.jsx';
import NewTaskDialog from './components/TaskList/NewTaskDialog.jsx';
import Pomodoro from './components/Pomodoro/Pomodoro.jsx';
import TimerAlertIcon from './components/Pomodoro/TimerAlertIcon.jsx';

import { getDocumentCookie, getTasks } from './helper-functions/helperFunctions.mjs';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0336FF',
    },
    secondary: {
      // main: '#FFDE03',
      main: '#eed00e',
    },
    info: {
      main: '#648dae',
    },
    warning: {
      main: '#FF0266',
    },
  },
});

const headingStyle = {
  mt: 8,
  mb: 2,
  fontFamily: 'Josefin Sans',
  fontWeight: 700,
  letterSpacing: 10,
  color: 'warning.main',
  textShadow: '1px -1px #fff, 1px 0 #fff, 1px 1px #fff, 0 -1px #fff, 0 0 #fff, 0 1px #fff, -1px 0 #fff, -1px 1px #fff, -1px -1px #fff, 10px -10px 0 #0336FF, 18px -18px #eed00e',
};

const gridItemStyle = {
  position: 'relative',
  backgroundColor: '#e4e4e4',
  border: '1px solid #0336FF',
  borderRadius: 1,
  p: 5,
  m: 2,
  width: '90%',
};

export default function App() {
  // ----------------------------
  // State variables
  // ----------------------------
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [userTasks, setUserTasks] = useState({});

  // ----------------------------
  // Functions to manage react state
  // ----------------------------
  const refreshTasks = () => getTasks().then((result) => setUserTasks(result));

  const checkAuth = async () => {
    const userId = getDocumentCookie('userId');
    const loginHash = getDocumentCookie('login');
    try {
      const { data } = await axios.post('/check-auth', { userId, loginHash });
      if (data.okay) setLoggedIn(true);
    } catch (error) {
      console.log('something went wrong');
    }
  };

  useEffect(() => { checkAuth(); }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container fixed>
        <Typography
          component="h1"
          variant="h1"
          color="warning"
          align="center"
          sx={headingStyle}
        >
          AstroTasks
        </Typography>
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
        >
          <Grid item xs={12} md={5} sx={gridItemStyle}>
            <Pomodoro
              timeLeft={timeLeft}
              setTimeLeft={setTimeLeft}
              currentTask={currentTask}
              timerActive={timerActive}
              setTimerActive={setTimerActive}
            />
            <TimerAlertIcon />
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
            sx={[gridItemStyle, { minHeight: 400, height: '65vh' }]}
          >
            {!loggedIn && <SignupLogin setLoggedIn={setLoggedIn} />}
            {loggedIn
            && (
            <TaskListContainer
              currentTask={currentTask}
              setCurrentTask={setCurrentTask}
              timerActive={timerActive}
              setTimerActive={setTimerActive}
              refreshTasks={refreshTasks}
              userTasks={userTasks}
            />
            )}
            {loggedIn && <NewTaskDialog refreshTasks={refreshTasks} />}
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
