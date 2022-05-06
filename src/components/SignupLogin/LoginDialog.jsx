import axios from 'axios';
import React, { useState } from 'react';
import {
  Button, Dialog, DialogTitle, DialogActions,
  DialogContent, DialogContentText,
} from '@mui/material';
import ErrorMsg from '../ErrorMsg.jsx';
import { LoginTextFields } from './FormComponents.jsx';

export default function LoginDialog({ setLoggedIn }) {
  // ----------------------------
  // State variables
  // ----------------------------
  const emptyUserDetails = {
    email: '',
    password: '',
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState(false);
  const [userDetails, setUserDetails] = useState(emptyUserDetails);

  // ----------------------------
  // Functions to manage react state
  // ----------------------------
  const handleClickOpen = () => setOpenDialog(true);

  const handleClose = () => {
    setUserDetails({ ...userDetails, password: '' });
    setOpenDialog(false);
  };

  const updateUserDetails = (event) => {
    const { value } = event.target;
    const key = event.target.id;
    setUserDetails({ ...userDetails, [key]: value });
  };

  const submitLogin = async () => {
    const { data } = await axios.post('/login', userDetails);

    if (!data.errors) {
      setUserDetails(emptyUserDetails);
      setOpenDialog(false);
      setError(false);
      setLoggedIn(true);
    } else {
      setError(true);
    }
  };

  return (
    <>
      <Button variant="contained" size="large" onClick={handleClickOpen}>
        Log In
      </Button>
      <Dialog open={openDialog} onClose={handleClose} maxWidth="sm">
        <DialogTitle>Log In</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Log in to your account to save your tasks and progress.
          </DialogContentText>
          <LoginTextFields userDetails={userDetails} updateUserDetails={updateUserDetails} />
          {error && <ErrorMsg />}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={submitLogin}>Log In</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
