import React, { useState } from 'react';
import { Fab, Tooltip } from '@mui/material';
import { NotificationsNoneRounded, NotificationsActiveRounded, NotificationsOffRounded } from '@mui/icons-material';

export default function TimerAlertIcon() {
  const [alertsAllowed, setAlertsAllowed] = useState(Notification.permission);
  const [iconTitle, setIconTitle] = useState('');

  const sendAlert = () => {
    const alert = new Notification('HELLO');
  };

  const checkNotificationPermission = () => {
    Notification.requestPermission()
      .then((permission) => {
        console.log(permission);
        setAlertsAllowed(permission);
        sendAlert();
      });
  };

  useState(() => {
    let msg = '';
    if (alertsAllowed === 'default') msg = 'Allow notifications to alert you when each session is over.';
    if (alertsAllowed === 'granted') msg = 'Notifications enabled. You will receive an alert when each session is over.';
    if (alertsAllowed === 'denied') msg = 'Notifications disabled. Change your browser notification settings to receive alerts when each session is over.';
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
        {alertsAllowed === 'default' && <NotificationsNoneRounded color="primary" />}
        {alertsAllowed === 'granted' && <NotificationsActiveRounded color="disabled" />}
        {alertsAllowed === 'denied' && <NotificationsOffRounded color="disabled" />}
      </Fab>
    </Tooltip>
  );
}
