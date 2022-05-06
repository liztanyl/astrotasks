import React from 'react';
import {
  DialogContentText, FormControl, FormHelperText,
  TextField, InputLabel, Select, MenuItem,
} from '@mui/material';

function SignupTextFields({ userDetails, updateUserDetails }) {
  return (
    <>
      <TextField
        autoFocus
        required
        margin="normal"
        variant="outlined"
        fullWidth
        id="email"
        label="Email Address"
        type="email"
        value={userDetails.email}
        onChange={updateUserDetails}
      />
      <TextField
        required
        margin="normal"
        variant="outlined"
        fullWidth
        id="password"
        label="Password"
        type="password"
        value={userDetails.password}
        onChange={updateUserDetails}
      />
      <TextField
        required
        margin="normal"
        variant="outlined"
        fullWidth
        id="name"
        label="Name"
        type="text"
        value={userDetails.name}
        onChange={updateUserDetails}
      />
    </>
  );
}

function BootcampSelect({ userDetails, updateUserBootcampDetails }) {
  const batches = ['FTBC6', 'FTBC7', 'PTBC1', 'PTBC2', 'PTBC3'];
  const bootcampBatches = batches.map((batch) => (
    <MenuItem value={batch} key={batch}>
      {batch}
    </MenuItem>
  ));

  return (
    <>
      <DialogContentText sx={{ mx: 1, mt: 2 }}>
        For Rocket Academy bootcamp students:
      </DialogContentText>
      <FormControl
        margin="normal"
        sx={{ width: '100%' }}
      >
        <InputLabel id="bootcamp-label">Bootcamp Batch</InputLabel>
        <Select
          id="bootcamp"
          label="Rocket Academy Bootcamp Batch"
          labelId="bootcamp-label"
          value={userDetails.bootcamp}
          onChange={updateUserBootcampDetails}
        >
          <MenuItem value="">&nbsp;</MenuItem>
          {bootcampBatches}
        </Select>
        <FormHelperText>
          If you select this,
          pre-class and post-class material
          will be added to your tasks daily.
        </FormHelperText>
      </FormControl>
    </>
  );
}

function LoginTextFields({ userDetails, updateUserDetails }) {
  return (
    <>
      <TextField
        autoFocus
        required
        margin="normal"
        variant="outlined"
        fullWidth
        id="email"
        label="Email Address"
        type="email"
        value={userDetails.email}
        onChange={updateUserDetails}
      />
      <TextField
        required
        margin="normal"
        variant="outlined"
        fullWidth
        id="password"
        label="Password"
        type="password"
        value={userDetails.password}
        onChange={updateUserDetails}
      />

    </>
  );
}

export {
  BootcampSelect,
  SignupTextFields,
  LoginTextFields,
};
