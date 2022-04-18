import { Snackbar, Alert } from '@mui/material';

const Notification = ({ snackbarState, handleClose }) => {
  return (
    <Snackbar
      open={snackbarState.open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
    >
      <Alert
        variant="filled"
        onClose={handleClose}
        severity={snackbarState.severity}
        sx={{ width: '100%' }}
      >
        {snackbarState.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
