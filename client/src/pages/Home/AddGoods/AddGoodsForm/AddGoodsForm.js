import React from "react";
import { useFormik } from "formik";
import ImageUploading from "react-images-uploading";
import UploadIcon from "@mui/icons-material/Upload";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// material
import {
  Stack,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { validationSchema } from "./utils/validationSchema";
import "./AddGoodsForm.scss";
import GoodsItemPreview from "./GoodItemPreview/GoodsItemPreview";
import { convertToBase64 } from "../../../../common/helpers/image";

function AddGoodsForm({ onAddNewGoodClick }) {
  const [image, setImage] = React.useState([]);
  const maxNumber = 1;

  const onChange = (imageList) => {
    setImage(imageList);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      price: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (regObj, { resetForm }) => {
      if (regObj.category === "") {
        regObj.category = "";
      }
      let img = "";
      let base64 = ""
      if (image.length !== 0) {
        img = image[0];
         base64 = await convertToBase64(img.file);
      } else {
        img = "";
        base64 = ""
      }

      regObj.price = parseFloat(regObj.price);

      onAddNewGoodClick({ ...regObj, image: base64 });
      resetForm();
      setImage([]);
    },
  });
  return (
    <form
      className="addGoods_form"
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <div>
        <h3 className="addGoods_form_title">
          Fill out this form to add a new good
        </h3>

        <div className="addGoods_form__fields">
          <Stack spacing={3}>
            <TextField
              style={{ width: 600 }}
              autoComplete="name"
              type="name"
              label="Name"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />

            <TextField
              style={{ width: 600 }}
              multiline
              rows={4}
              type="description"
              label="Gescription"
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
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
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
            </Stack>
          </Stack>

          <ImageUploading
            multiple
            value={image}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageUpdate,
              onImageRemove,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                <Button
                  style={{ width: "200px", marginBottom: 25 }}
                  variant="contained"
                  endIcon={<UploadIcon />}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Set photo
                </Button>
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <div className="image-item__btn-wrapper">
                      <Button onClick={() => onImageUpdate(index)}>
                        <RotateLeftIcon />{" "}
                      </Button>
                      <Button onClick={() => onImageRemove(index)}>
                        <DeleteOutlineIcon />{" "}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>

          <Button
            style={{ width: 600, backgroundColor: "rgb(0, 171, 85)" }}
            size="large"
            type="submit"
            variant="contained"
            // loading={isSubmitting}
          >
            Sell
          </Button>
        </div>
      </div>
      <div className="previewCard">
        <h4 style={{ fontWeight: 400, marginBottom: 20 }}>
          You can see how your ad will look
        </h4>
        <GoodsItemPreview
          img={image[0] && image[0]["data_url"]}
          good={formik.values}
        />
      </div>
    </form>
  );
}

export default AddGoodsForm;
