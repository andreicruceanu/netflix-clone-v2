import {
  schemaCreateAdmin,
  schemaForgotPasswordCheckEmail,
  schemaLoginAdmin,
  schemaResetPassword,
} from "./schemaValidation.js";

const schemaAdminValidate = {
  createAdmin: (admin) => schemaCreateAdmin.validate(admin),
  login: (admin) => schemaLoginAdmin.validate(admin),
  forgotPasswordCheckEmail: (email) =>
    schemaForgotPasswordCheckEmail.validate(email),
  resetPassword: (newPassword) => schemaResetPassword.validate(newPassword),
};

export default schemaAdminValidate;
