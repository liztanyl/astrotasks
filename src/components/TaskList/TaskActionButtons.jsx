import React from 'react';
import {
  CardActions, IconButton, Checkbox, Tooltip,
} from '@mui/material';
import {
  OpenInNewRounded, CheckBoxRounded, CheckBoxOutlineBlankRounded,
} from '@mui/icons-material';
import EditTaskDialog from './EditTaskDialog.jsx';

function OpenInNewWindowIcon({ todo }) {
  return (
    <Tooltip
      arrow
      placement="top-end"
      title="Open course material in new window"
    >
      <IconButton href={todo.url} target="_blank">
        <OpenInNewRounded
          fontSize="small"
          sx={{ color: todo.completed ? 'secondary.dark' : 'primary.main' }}
        />
      </IconButton>
    </Tooltip>
  );
}

export default function TaskActionButtons({
  todo, taskType, refreshTasks, updateCheckBox,
}) {
  return (
    <CardActions>
      <Checkbox
        checked={todo.completed}
        onChange={() => updateCheckBox(todo.id, todo.completed)}
        icon={<CheckBoxOutlineBlankRounded color="warning" />}
        checkedIcon={<CheckBoxRounded sx={{ color: 'secondary.dark' }} />}
      />
      {(taskType === 'pce' || taskType === 'poce')
        && <OpenInNewWindowIcon todo={todo} />}
      {!(taskType === 'pce' || taskType === 'poce')
        && (
        <EditTaskDialog
          todo={todo}
          taskType={taskType}
          refreshTasks={refreshTasks}
        />
        )}
    </CardActions>
  );
}
