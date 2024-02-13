import {
  schemaCreateAdmin,
  schemaForgotPasswordCheckEmail,
  schemaLoginAdmin,
} from "./schemaValidation.js";

const schemaAdminValidate = {
  createAdmin: (admin) => schemaCreateAdmin.validate(admin),
  login: (admin) => schemaLoginAdmin.validate(admin),
  forgotPasswordCheckEmail: (email) =>
    schemaForgotPasswordCheckEmail.validate(email),
};

export default schemaAdminValidate;
