import React from 'react';
import { Stack } from '@mui/material';
import SignupDialog from './SignupDialog.jsx';
import LoginDialog from './LoginDialog.jsx';

export default function SignupLogin({ setLoggedIn }) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={5}
      sx={{ height: '100%' }}
    >
      <SignupDialog setLoggedIn={setLoggedIn} />
      <LoginDialog setLoggedIn={setLoggedIn} />
    </Stack>
  );
}
