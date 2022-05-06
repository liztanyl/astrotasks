import React, { useState, useEffect } from 'react';
import { Box, Collapse, Button } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import TaskCards from './TaskCards.jsx';
import { getDocumentCookie } from '../../helper-functions/helperFunctions.mjs';

export default function TaskListContainer({
  currentTask, setCurrentTask, timerActive, setTimerActive, refreshTasks, userTasks,
}) {
  const isBootcampStudent = getDocumentCookie('bootcamp');

  // ----------------------------
  // State variables
  // ----------------------------
  const [expanded, setExpanded] = useState({});

  // ----------------------------
  // Functions to manage react state
  // ----------------------------
  const handleExpandClick = async (id) => {
    const value = expanded[id] !== true;
    setExpanded({ ...expanded, [id]: value });
    refreshTasks();
  };

  useEffect(() => { refreshTasks(); }, []);

  // ----------------------------
  // Component:
  // Clickable header for each task list (eg PRE-CLASS / POST-CLASS)
  // ----------------------------
  function TaskListHeader({ id }) {
    let headerName = null;
    if (id === 'pce') headerName = 'pre-class';
    if (id === 'poce') headerName = 'post-class';
    return (
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => handleExpandClick(id)}
      >
        {headerName || id}
        <ExpandMore
          sx={{ transform: !expanded[id] ? 'rotate(0deg)' : 'rotate(180deg)' }}
        />
      </Button>
    );
  }

  // ----------------------------
  // Array of React components: All task lists
  // taskType: pce, poce, others if any
  // arrayOfTasks: array of tasks with that task type
  // ----------------------------
  const taskGroups = Object.entries(userTasks)
    // eslint-disable-next-line array-callback-return, consistent-return
    .map(([taskType, arrayOfTasks]) => {
      if ((isBootcampStudent && (taskType === 'pce' || taskType === 'poce'))
      || arrayOfTasks.length > 0) {
        return (
          <Box my={2} key={`${taskType}-${getDocumentCookie('userId')}`}>
            <TaskListHeader id={taskType} />
            <Collapse in={expanded[taskType]} timeout="auto" unmountOnExit>
              <TaskCards
                taskType={taskType}
                arrayOfTasks={arrayOfTasks}
                currentTask={currentTask}
                setCurrentTask={setCurrentTask}
                timerActive={timerActive}
                setTimerActive={setTimerActive}
                refreshTasks={refreshTasks}
              />
            </Collapse>
          </Box>
        );
      } });

  return (
    <Box sx={{ height: 'calc(100% - 10px)', overflowY: 'auto' }}>
      {taskGroups}
    </Box>
  );
}
