import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  Tooltip, IconButton,
  Dialog, DialogTitle, DialogContent,
  DialogActions, Button,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import ErrorMsg from '../ErrorMsg.jsx';
import { TaskNameField, FormTags } from './FormComponents.jsx';

export default function EditTaskDialog({ todo, taskType, refreshTasks }) {
  // ----------------------------
  // State variables
  // ----------------------------
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState(false);
  const [taskName, setTaskName] = useState(todo.name);
  const [selectedTags, setSelectedTags] = useState([taskType]);

  // ----------------------------
  // Functions to manage react state
  // ----------------------------
  const handleClickOpen = () => setOpenDialog(true);

  const handleClose = () => {
    setTaskName(todo.name);
    setSelectedTags([taskType]);
    setOpenDialog(false);
    setError(false);
  };

  const updateTaskName = (event) => setTaskName(event.target.value);

  const updateSelectedTags = (event) => {
    const { value } = event.target;
    const newTags = [...selectedTags];

    // check if chosen tag is currently in selectedTags
    // if it isnt, add it; if it is, remove it
    const i = newTags.indexOf(value);
    i === -1 ? newTags.push(value) : newTags.splice(i, 1);

    // if no tags selected, mark task as 'others'
    if (newTags.length < 1) newTags.push('others');

    setSelectedTags(newTags);
  };

  // ----------------------------
  // Functions with calls to db
  // ----------------------------
  const submitEditTask = async () => {
    const taskId = todo.id;
    const { data } = await axios.post(`/task/${taskId}/edit`,
      { taskName, selectedTags });

    if (!data.errors) {
      handleClose();
      setError(false);
      refreshTasks();
    } else {
      setTaskName(todo.name);
      setError(true);
    }
  };

  const submitDestroyTask = async () => {
    const taskId = todo.id;
    const { data } = await axios.post(`/task/${taskId}/delete`);

    if (!data.errors) {
      handleClose();
      setError(false);
      refreshTasks();
    } else {
      setError(true);
    }
  };

  // ----------------------------
  // useEffect to update task tags on mount
  // ----------------------------
  useEffect(() => {
    // Map task to tags
    axios.post(`/task/${todo.id}`)
      .then((result) => {
        const task = result.data;
        const taskTags = task.tags.map((tag) => tag.name);
        setSelectedTags(taskTags);
      });
  }, []);

  return (
    <>
      <Tooltip title="Edit task" placement="top-end" arrow>
        <IconButton
          onClick={handleClickOpen}
        >
          <Edit
            fontSize="small"
            sx={{ color: todo.completed ? 'secondary.dark' : 'primary.main' }}
          />
        </IconButton>
      </Tooltip>
      <Dialog open={openDialog} onClose={handleClose} maxWidth="sm">
        <DialogTitle>Edit task</DialogTitle>
        <DialogContent>
          <TaskNameField taskName={taskName} updateTaskName={updateTaskName} />
          <FormTags
            selectedTags={selectedTags}
            updateSelectedTags={updateSelectedTags}
          />
          {error && <ErrorMsg />}
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="text" color="warning" onClick={submitDestroyTask}>
            Delete task
          </Button>
          <Button variant="contained" onClick={submitEditTask}>
            Edit task
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
