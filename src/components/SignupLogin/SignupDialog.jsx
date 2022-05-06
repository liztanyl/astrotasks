import axios from 'axios';
import React, { useState } from 'react';
import {
  Button, Dialog, DialogTitle, DialogActions,
  DialogContent, DialogContentText,
} from '@mui/material';
import ErrorMsg from '../ErrorMsg.jsx';
import { SignupTextFields, BootcampSelect } from './FormComponents.jsx';

export default function SignupDialog({ setLoggedIn }) {
  // ----------------------------
  // State variables
  // ----------------------------
  const emptyUserDetails = {
    email: '',
    password: '',
    name: '',
    bootcamp: '',
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

  const updateUserBootcampDetails = (event) => {
    const { value } = event.target;
    setUserDetails({ ...userDetails, bootcamp: value });
  };

  const submitSignup = async () => {
    const { data } = await axios.post('/signup', userDetails);

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
        Sign Up
      </Button>
      <Dialog open={openDialog} onClose={handleClose} maxWidth="sm">
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create an account to keep track of your tasks.
          </DialogContentText>
          <SignupTextFields
            userDetails={userDetails}
            updateUserDetails={updateUserDetails}
          />
          <BootcampSelect
            userDetails={userDetails}
            updateUserBootcampDetails={updateUserBootcampDetails}
          />
          {error && <ErrorMsg />}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={submitSignup}>Sign up</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
