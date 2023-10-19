import {
  schemaChangeEmail,
  schemaSignup,
  schemaUpdatePassword,
  schemaUpdateUser,
} from "./schemaValidation.js";
import { schemaSignin } from "./schemaValidation.js";

const validateDataFromUser = {
  signup: (user) => schemaSignup.validate(user),
  signin: (user) => schemaSignin.validate(user),
  updatePassowrd: (passwordData) => schemaUpdatePassword.validate(passwordData),
  updateUser: (updatedUser) => schemaUpdateUser.validate(updatedUser),
  changeEmail: (emailData) => schemaChangeEmail.validate(emailData),
};

export default validateDataFromUser;
