import * as yup from "yup";

export const validationSchema = () =>
  yup.object({
    toCountry: yup
      .string()
      .min(3, "Min length 3 letters")
      .required("Name is required"),
      toCity: yup
      .string()
      .min(3, "Min length 3 letters")
      .required("City/town is required"),
      toStreet: yup
      .string()
      .min(3, "Min length 3 letters")
      .required("Street is required"),
      toPhoneNumber: yup
      .string()
      .length(10, "Should be 10 digits")
      .required("Phone is required"),
  });