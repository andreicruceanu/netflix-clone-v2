import { schemaSignup, schemaUpdatePassword } from "./schemaValidation.js";
import { schemaSignin } from "./schemaValidation.js";

const validateDataFromUser = {
  signup: (user) => schemaSignup.validate(user),
  signin: (user) => schemaSignin.validate(user),
  updatePassowrd: (passwordData) => schemaUpdatePassword.validate(passwordData),
};

export default validateDataFromUser;
