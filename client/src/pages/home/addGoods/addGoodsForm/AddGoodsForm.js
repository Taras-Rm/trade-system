import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  FormControl,
  OutlinedInput,
  InputLabel,
  FormHelperText,
  Input,
  MenuItem,
  Select,
} from "@mui/material";
import { validationSchema } from "./utils/validationSchema";
import { red } from "@mui/material/colors";
import "./AddGoodsForm.scss";
import { Box } from "@mui/system";

function AddGoodsForm({onSubmitForm}) {

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      price: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (goodObj) => {
      onSubmitForm({ ...goodObj, price: parseFloat(goodObj.price) });
    },
  });

  return (
    <form
      className="addGoods_form"
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <Stack spacing={3}>
        <TextField
          style={{ width: 500 }}
          autoComplete="name"
          type="name"
          label="Goods name"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          style={{ width: 500 }}
          multiline
          type="description"
          label="Goods description"
          id="description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description &&
            Boolean(formik.errors.description)
          }
          helperText={
            formik.touched.description && formik.errors.description
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
              value={formik.values.category}
              label="Category"
              onChange={formik.handleChange}
            >
              <MenuItem value={"toy"}>Toyes</MenuItem>
              <MenuItem value={"eat"}>Eat</MenuItem>
              <MenuItem value={"car"}>Cars</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            type="price"
            label="Price $$$"
            id="price"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
        </Stack>
        <Button
          style={{ width: 500, backgroundColor: "rgb(0, 171, 85)" }}
          size="large"
          type="submit"
          variant="contained"
          // loading={isSubmitting}
        >
          Sell
        </Button>
      </Stack>
      
    </form>
  );
}

export default AddGoodsForm;
