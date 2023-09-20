import * as Yup from "yup";
const validationForm = {
  signup: Yup.object({
    firstName: Yup.string()
      .max(20, "First Name maximum 20 characters")
      .required("First Name is required"),
    lastName: Yup.string()
      .max(20, "Last Name maximum 20 characters")
      .required("Last Name is required"),
    email: Yup.string().email("Email invalid").required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
        "The password must have at least 8 characters, uppercase, lowercase, a number and a special character"
      )
      .required("Password is required"),
  }),
  signin: Yup.object({
    email: Yup.string().email("Email invalid").required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
        "The password must have at least 8 characters, uppercase, lowercase, a number and a special character"
      )
      .required("Password is required"),
  }),
};

export { validationForm };
