'use client';

import React, { useEffect } from 'react';
import {
  Snackbar,
  Alert,
  AlertTitle,
  Box,
  IconButton,
  Portal,
  Slide,
  SlideProps,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { removeNotification } from '@/lib/store/slices/uiSlice';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

export default function NotificationSystem() {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state: RootState) => state.ui);

  const handleClose = (notificationId: string) => {
    dispatch(removeNotification(notificationId));
  };

  // Auto-dismiss notifications
  useEffect(() => {
    notifications.forEach((notification) => {
      if (!notification.persistent && notification.duration) {
        const timer = setTimeout(() => {
          handleClose(notification.id);
        }, notification.duration);

        return () => clearTimeout(timer);
      }
    });
  }, [notifications]);

  if (notifications.length === 0) {
    return null;
  }

  return (
    <Portal>
      <Box
        sx={{
          position: 'fixed',
          top: 80,
          right: 16,
          zIndex: (theme) => theme.zIndex.snackbar,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          maxWidth: 400,
          width: '100%',
          maxHeight: 'calc(100vh - 100px)',
          overflow: 'hidden',
        }}
      >
        {notifications.slice(0, 5).map((notification, index) => (
          <Snackbar
            key={notification.id}
            open={true}
            TransitionComponent={SlideTransition}
            sx={{
              position: 'static',
              transform: 'none',
              '& .MuiSnackbar-root': {
                position: 'static',
              },
            }}
          >
            <Alert
              severity={notification.type}
              variant="filled"
              sx={{
                width: '100%',
                '& .MuiAlert-message': {
                  flexGrow: 1,
                },
              }}
              action={
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={() => handleClose(notification.id)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
            >
              <AlertTitle sx={{ mb: 0.5 }}>{notification.title}</AlertTitle>
              {notification.message}
            </Alert>
          </Snackbar>
        ))}
      </Box>
    </Portal>
  );
} 