import React, { useEffect, useState } from 'react';
import { Fab, Tooltip } from '@mui/material';
import { NotificationsActiveRounded, NotificationsOffRounded } from '@mui/icons-material';

export default function TimerAlertIcon() {
  const [alertsAllowed, setAlertsAllowed] = useState(Notification.permission);
  const [iconTitle, setIconTitle] = useState('');

  const checkNotificationPermission = () => {
    Notification.requestPermission()
      .then((permission) => {
        console.log(permission);
        setAlertsAllowed(permission);
      });
  };

  useEffect(() => {
    checkNotificationPermission();
    let msg = '';
    if (alertsAllowed === 'default' || alertsAllowed === 'denied') msg = 'Notifications disabled. Change your browser notification settings to receive alerts when each session is over.';
    if (alertsAllowed === 'granted') msg = 'Notifications enabled. You will receive an alert when each session is over.';
    setIconTitle(msg);
  }, [alertsAllowed]);

  return (
    <Tooltip title={iconTitle} placement="right">
      <Fab
        onClick={checkNotificationPermission}
        size="small"
        color="secondary"
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
        }}
      >
        {alertsAllowed === 'granted' && <NotificationsActiveRounded color="disabled" />}
        {(alertsAllowed === 'default' || alertsAllowed === 'denied') && <NotificationsOffRounded color="disabled" />}
      </Fab>
    </Tooltip>
  );
}
