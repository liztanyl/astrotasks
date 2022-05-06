import React from 'react';
import {
  Fab, Typography, TextField,
  DialogContentText, ToggleButtonGroup, ToggleButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function NewTaskButton({ handleClickOpen }) {
  return (
    <Fab
      onClick={handleClickOpen}
      size="medium"
      variant="extended"
      color="warning"
      sx={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        p: 1,
        pr: 2,
      }}
    >
      <AddIcon sx={{ mr: 1 }} />
      <Typography variant="button">New Task</Typography>
    </Fab>
  );
}

function TaskNameField({ taskName, updateTaskName }) {
  return (
    <TextField
      autoFocus
      required
      margin="normal"
      variant="outlined"
      fullWidth
      id="name"
      label="Task name"
      type="text"
      value={taskName}
      onChange={updateTaskName}
    />
  );
}

function FormTags({ selectedTags, updateSelectedTags }) {
  return (
    <>
      <DialogContentText mb={1} mt={3}>
        Select one or more tags for this task:
      </DialogContentText>
      <ToggleButtonGroup
        color="primary"
        value={selectedTags}
        onChange={updateSelectedTags}
      >
        <ToggleButton value="personal">
          Personal
        </ToggleButton>
        <ToggleButton value="work">
          Work
        </ToggleButton>
        <ToggleButton value="project">
          Project
        </ToggleButton>
        <ToggleButton value="others">
          Others
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}

export {
  NewTaskButton,
  TaskNameField,
  FormTags,
};
