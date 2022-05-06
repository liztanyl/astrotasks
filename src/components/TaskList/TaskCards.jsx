import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import TaskActionButtons from './TaskActionButtons.jsx';

const cardStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'secondary.light',
  boxShadow: 1,
  my: 2,
  mx: 0.5,
  p: 1,
  pl: 2,
};

const currentTaskStyle = {
  borderStyle: 'solid',
  borderWidth: 2,
  borderColor: 'warning.light',
};

export default function TaskCards({
  taskType, arrayOfTasks, refreshTasks,
  currentTask, setCurrentTask, timerActive,
  setTimerActive,
}) {
  // ----------------------------
  // State variables
  // ----------------------------
  const taskStatusArr = arrayOfTasks
    .map(({ id, completed }) => ({ [id]: completed }));

  const [taskStatus, setTaskStatus] = useState(taskStatusArr);

  // ----------------------------
  // Functions to manage react state
  // ----------------------------
  const updateCheckBox = async (id, completed) => {
    const {
      data: { newTaskId, newTaskStatus },
    } = await axios.post(`/task/${id}/update`, { taskStatus: completed });

    const newTaskStatusObj = { ...taskStatus };
    newTaskStatusObj[newTaskId] = newTaskStatus;
    setTaskStatus(newTaskStatusObj);

    if (currentTask && currentTask.id === id && !completed) {
      setCurrentTask(null);
      setTimerActive(false);
    }
  };

  const changeCurrentTask = (targetTask) => {
    // if timer is not running and target task is incomplete,
    // set target task as current task
    if (!timerActive && !targetTask.completed) {
      setCurrentTask(targetTask);
      setTimerActive(true);
    }
  };

  useEffect(() => { refreshTasks(); }, [taskStatus]);

  // ----------------------------
  // Array of react components: Task cards
  // ----------------------------
  const taskCards = arrayOfTasks.map((todo) => (
    <Card
      key={`${todo.id}`}
      sx={[cardStyle, todo.id === currentTask?.id && currentTaskStyle]}
    >
      <CardContent
        sx={{ flexGrow: 1 }}
        onClick={() => { changeCurrentTask(todo); }}
      >
        <Typography
          variant="button"
          fontWeight={500}
          sx={{ color: todo.completed ? 'secondary.dark' : 'text.main' }}
        >
          {todo.name}
        </Typography>
      </CardContent>
      <TaskActionButtons
        todo={todo}
        taskType={taskType}
        refreshTasks={refreshTasks}
        updateCheckBox={updateCheckBox}
      />
    </Card>
  ));

  return taskCards;
}
