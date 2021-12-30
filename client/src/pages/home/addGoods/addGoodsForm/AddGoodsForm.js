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

function AddGoodsForm() {
  const formik = useFormik({
    initialValues: {
      goodsname: "",
      goodsdescription: "",
      category: "",
      price: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (regObj) => {
      alert(regObj);
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
          autoComplete="goodsname"
          type="goodsname"
          label="Goods name"
          id="goodsname"
          name="goodsname"
          value={formik.values.goodsname}
          onChange={formik.handleChange}
          error={formik.touched.goodsname && Boolean(formik.errors.goodsname)}
          helperText={formik.touched.goodsname && formik.errors.goodsname}
        />
        <TextField
          style={{ width: 500 }}
          multiline
          type="goodsdescription"
          label="Goods description"
          id="goodsdescription"
          name="goodsdescription"
          value={formik.values.goodsdescription}
          onChange={formik.handleChange}
          error={
            formik.touched.goodsdescription &&
            Boolean(formik.errors.goodsdescription)
          }
          helperText={
            formik.touched.goodsdescription && formik.errors.goodsdescription
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
              <MenuItem value={10}>Toyes</MenuItem>
              <MenuItem value={20}>Eat</MenuItem>
              <MenuItem value={30}>Cars</MenuItem>
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
