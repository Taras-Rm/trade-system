import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const validationSchema = () =>
  yup.object({
    firstName: yup.string().required("validation.FieldIsRequired"),
    lastName: yup.string().required("validation.FieldIsRequired"),
    email: yup
      .string()
      .email("validation.EnterValidEmail")
      .required("validation.FieldIsRequired"),
    password: yup
      .string()
      .min(8, "validation.Min8Char")
      .required("validation.FieldIsRequired"),
    age: yup.number().required("validation.FieldIsRequired"),
    confirmPassword: yup
      .string()
      .min(8, "validation.Min8Char")
      .required("validation.FieldIsRequired")
      .oneOf([yup.ref("password"), null], "validation.PasswordsMustMatch"),
    phone: yup
      .string()
      .max(10, "validation.Max10Digits")
      .matches(phoneRegExp, "validation.InvalidPhone")
      .required("validation.FieldIsRequired"),
  });
