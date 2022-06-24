import React from "react";
import "./UserUpdateForm.scss";
import { Stack, TextField, Button } from "@mui/material";

function UserUpdateForm({ onSubmit, formData }) {
  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={3}>
        <TextField
          style={{ width: 500 }}
          autoComplete="firstName"
          type="firstName"
          label="First name"
          id="firstName"
          name="firstName"
          value={formData.values.firstName}
          onChange={formData.handleChange}
          error={
            formData.touched.firstName && Boolean(formData.errors.firstName)
          }
          helperText={formData.touched.firstName && formData.errors.firstName}
        />

        <TextField
          style={{ width: 500 }}
          multiline
          type="lastName"
          label="Last name"
          id="lastName"
          name="lastName"
          value={formData.values.lastName}
          onChange={formData.handleChange}
          error={formData.touched.lastName && Boolean(formData.errors.lastName)}
          helperText={formData.touched.lastName && formData.errors.lastName}
        />

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            fullWidth
            type="age"
            label="Age"
            id="age"
            name="age"
            value={formData.values.age}
            onChange={formData.handleChange}
            error={formData.touched.age && Boolean(formData.errors.age)}
            helperText={formData.touched.age && formData.errors.age}
          />
          <TextField
            fullWidth
            type="phone"
            label="Phone"
            id="phone"
            name="phone"
            value={formData.values.phone}
            onChange={formData.handleChange}
            error={formData.touched.phone && Boolean(formData.errors.phone)}
            helperText={formData.touched.phone && formData.errors.phone}
          />
        </Stack>
        <Button
          style={{ width: 500, backgroundColor: "rgb(0, 171, 85)" }}
          size="large"
          type="submit"
          variant="contained"
        >
          Update
        </Button>
      </Stack>
    </form>
  );
}

export default UserUpdateForm;
