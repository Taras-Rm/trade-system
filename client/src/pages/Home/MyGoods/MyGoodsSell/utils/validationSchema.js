import * as yup from "yup";

export const validationSchema = () =>
  yup.object({
    name: yup
      .string()
      .min(3, "Min length 3 letters")
      .required("Name is required"),
    price: yup.number().required("Price is required"),
  });
