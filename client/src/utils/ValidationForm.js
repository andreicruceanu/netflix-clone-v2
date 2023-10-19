import * as Yup from "yup";

const RulesPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
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
        RulesPassword,
        "The password must have at least 8 characters, uppercase, lowercase, a number and a special character"
      )
      .required("Password is required"),
  }),
  signin: Yup.object({
    email: Yup.string().email("Email invalid").required("Email is required"),
    password: Yup.string()
      .matches(
        RulesPassword,
        "The password must have at least 8 characters, uppercase, lowercase, a number and a special character"
      )
      .required("Password is required"),
  }),
  updateProfileUser: Yup.object({
    firstName: Yup.string()
      .max(20, "First Name maximum 20 characters")
      .required("First Name is required"),
    lastName: Yup.string()
      .max(20, "Last Name maximum 20 characters")
      .required("Last Name is required"),
  }),
  changePassword: Yup.object({
    oldPassword: Yup.string()
      .matches(
        RulesPassword,
        "The password must have at least 8 characters, uppercase, lowercase, a number and a special character"
      )
      .required("Old password is required"),
    password: Yup.string()
      .matches(
        RulesPassword,
        "The password must have at least 8 characters, uppercase, lowercase, a number and a special character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .matches(
        RulesPassword,
        "The password must have at least 8 characters, uppercase, lowercase, a number and a special character"
      )
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Password is required"),
  }),
  changeEmail: Yup.object({
    oldEmail: Yup.string().email("Email invalid").required("Email is required"),
    newEmail: Yup.string().email("Email invalid").required("Email is required"),
    password: Yup.string()
      .matches(
        RulesPassword,
        "The password must have at least 8 characters, uppercase, lowercase, a number and a special character"
      )
      .required("Password is required"),
  }),
};

export { validationForm };
