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
import "./GoodUpdateForm.scss";

const GoodUpdateForm = ({ onSubmit, formData }) => {
  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={3}>
        <TextField
          style={{ width: 500 }}
          autoComplete="name"
          type="name"
          label="Name"
          id="name"
          name="name"
          value={formData.values.name}
          onChange={formData.handleChange}
          error={formData.touched.name && Boolean(formData.errors.name)}
          helperText={formData.touched.name && formData.errors.name}
        />

        <TextField
          style={{ width: 500 }}
          multiline
          rows={4}
          type="description"
          label="Gescription"
          id="description"
          name="description"
          value={formData.values.description}
          onChange={formData.handleChange}
          error={
            formData.touched.description && Boolean(formData.errors.description)
          }
          helperText={
            formData.touched.description && formData.errors.description
          }
        />

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              type="category"
              id="category"
              name="category"
              labelId="demo-simple-select-label"
              value={formData.values.category}
              label="Category"
              onChange={formData.handleChange}
            >
              <MenuItem value={"toy"}>Toys</MenuItem>
              <MenuItem value={"food"}>Food</MenuItem>
              <MenuItem value={"car"}>Cars</MenuItem>
              <MenuItem value={"clothing"}>Clothing</MenuItem>
              <MenuItem value={"for home"}>For home</MenuItem>
              <MenuItem value={"books"}>Books</MenuItem>
              <MenuItem value={"beauty"}>Beauty</MenuItem>
              <MenuItem value={""}>Without category</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            type="price"
            label="Price $"
            id="price"
            name="price"
            value={formData.values.price}
            onChange={formData.handleChange}
            error={formData.touched.price && Boolean(formData.errors.price)}
            helperText={formData.touched.price && formData.errors.price}
          />
        </Stack>
        <Button
          style={{ width: 500, backgroundColor: "rgb(0, 171, 85)" }}
          size="large"
          type="submit"
          variant="contained"
          // loading={isSubmitting}
        >
          Update
        </Button>
      </Stack>
    </form>
  );
};

export default GoodUpdateForm;
