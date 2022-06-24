import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const validationSchema = () =>
  yup.object({
    firstName: yup.string().required("validation.FieldIsRequired").min(3, "Min length 3 letters"),
    lastName: yup.string().required("validation.FieldIsRequired").min(3, "Min length 3 letters"),
    age: yup.number().required("validation.FieldIsRequired"),
    phone: yup
      .string()
      .max(10, "validation.Max10Digits")
      .matches(phoneRegExp, "validation.InvalidPhone")
      .required("validation.FieldIsRequired"),
  });
