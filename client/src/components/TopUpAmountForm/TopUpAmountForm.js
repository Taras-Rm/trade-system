import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import React from "react";
import "./TopUpAmountForm.scss";

const TopUpAmountForm = ({ handler, formData }) => {
  return (
    <Stack spacing={3}>
      <TextField
        style={{ width: 500 }}
        autoComplete="amount"
        type="amount"
        label="Amount"
        id="amount"
        name="amount"
        value={formData.values.amount}
        onChange={formData.handleChange}
        error={formData.touched.amount && Boolean(formData.errors.amount)}
        helperText={formData.touched.amount && formData.errors.amount}
      />
      <Button
        style={{ width: 500, backgroundColor: "rgb(0, 171, 85)" }}
        size="large"
        type="submit"
        variant="contained"
        onClick={handler}
        // loading={isSubmitting}
      >
        Top up
      </Button>
    </Stack>
  );
};

export default TopUpAmountForm;
