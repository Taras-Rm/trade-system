import * as yup from "yup";

export const validationSchema = () =>
  yup.object({
    name: yup
      .string()
      .min(3, "Min length 3 letters")
      .required("Name is required"),
    description: yup.string(),
    category: yup.string(),
    price: yup
      .number("Must be number")
      .required("Price is required")
      .positive()
      .integer(),
  });
