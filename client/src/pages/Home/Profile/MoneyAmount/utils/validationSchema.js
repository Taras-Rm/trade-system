import * as yup from "yup";

export const validationSchema = () =>
  yup.object({
      amount: yup
      .string()
      .min(1, "Should be at least 1 digit")
      .required("Amount is required"),
  });