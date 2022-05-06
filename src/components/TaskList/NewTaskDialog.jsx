import axios from 'axios';
import React, { useState } from 'react';
import {
  Box, Dialog, DialogTitle, DialogContent,
  DialogActions, Button,
} from '@mui/material';
import { getDocumentCookie } from '../../helper-functions/helperFunctions.mjs';
import ErrorMsg from '../ErrorMsg.jsx';
import { TaskNameField, FormTags, NewTaskButton } from './FormComponents.jsx';

export default function NewTaskDialog({ refreshTasks }) {
  // ----------------------------
  // State variables
  // ----------------------------
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [selectedTags, setSelectedTags] = useState(['others']);

  // ----------------------------
  // Functions to manage react state
  // ----------------------------
  const handleClickOpen = () => setOpenDialog(true);

  const handleClose = () => {
    setTaskName('');
    setSelectedTags(['others']);
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
  // Function with calls to db
  // ----------------------------
  const submitNewTask = async () => {
    const userId = getDocumentCookie('userId');
    const { data } = await axios.post('/tasks/add',
      { taskName, userId, selectedTags });

    if (!data.errors) {
      handleClose();
      setError(false);
      refreshTasks();
    } else {
      setError(true);
    }
  };

  return (
    <>
      <Box sx={{ position: 'relative', height: 10 }}>
        <NewTaskButton handleClickOpen={handleClickOpen} />
      </Box>
      <Dialog open={openDialog} onClose={handleClose} maxWidth="sm">
        <DialogTitle>Create new task</DialogTitle>
        <DialogContent>
          <TaskNameField taskName={taskName} updateTaskName={updateTaskName} />
          <FormTags
            selectedTags={selectedTags}
            updateSelectedTags={updateSelectedTags}
          />
          {error && <ErrorMsg />}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={submitNewTask}>Create task</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
