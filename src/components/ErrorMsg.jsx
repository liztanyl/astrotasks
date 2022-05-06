import React from 'react';
import { DialogContentText } from '@mui/material';

export default function ErrorMsg() {
  return (
    <DialogContentText
      sx={{
        p: 1.5,
        mt: 2,
        color: '#fff',
        backgroundColor: 'warning.light',
        border: '1px solid black',
        borderColor: 'warning.dark',
        borderRadius: 1,
      }}
    >
      Something went wrong. Check your fields and try again.
    </DialogContentText>
  );
}
