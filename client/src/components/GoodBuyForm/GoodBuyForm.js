import {
  Stack,
  TextField,
  Button,
}from "@mui/material";
import React from "react";
import "./GoodBuyForm.scss";

const GoodBuyForm = ({ formData, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
       <Stack spacing={2}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>

        <TextField
          fullWidth
          autoComplete="toCountry"
          type="toCountry"
          label="Country"
          id="toCountry"
          name="toCountry"
          value={formData.values.toCountry}
          onChange={formData.handleChange}
          error={formData.touched.toCountry && Boolean(formData.errors.toCountry)}
          helperText={formData.touched.toCountry && formData.errors.toCountry}
        />

        <TextField
          fullWidth
          multiline
          type="toCity"
          label="City/town"
          id="toCity"
          name="toCity"
          value={formData.values.toCity}
          onChange={formData.handleChange}
          error={
            formData.touched.description && Boolean(formData.errors.toCity)
          }
          helperText={formData.touched.toCity && formData.errors.toCity}
        />
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
            fullWidth
            type="toStreet"
            label="Street"
            id="toStreet"
            name="toStreet"
            value={formData.values.toStreet}
            onChange={formData.handleChange}
            error={formData.touched.toStreet && Boolean(formData.errors.toStreet)}
            helperText={formData.touched.toStreet && formData.errors.toStreet}
          />

        <TextField
          fullWidth
          type="toPhoneNumber"
          label="Phone"
          id="toPhoneNumber"
          name="toPhoneNumber"
          value={formData.values.toPhoneNumber}
          onChange={formData.handleChange}
          error={formData.touched.toPhoneNumber && Boolean(formData.errors.toPhoneNumber)}
          helperText={formData.touched.toPhoneNumber && formData.errors.toPhoneNumber}
        />
      </Stack>
      <Button
        style={{ width: 500, backgroundColor: "rgb(0, 171, 85)" }}
        size="large"
        type="submit"
        variant="contained"
        // loading={isSubmitting}
      >
        Buy
      </Button>
    </Stack>
    </form>
   
  );
};

export default GoodBuyForm;
