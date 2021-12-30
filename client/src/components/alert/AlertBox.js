import React, { useState } from "react";
import { Alert, Snackbar } from "@mui/material";

function AlertBox({ isOpen }) {
  const [open, setOpen] = useState(isOpen);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        This is a success message!
      </Alert>
    </Snackbar>
  );
}

export default AlertBox;
