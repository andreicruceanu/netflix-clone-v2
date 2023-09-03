import { schemaSignup } from "./schemaValidation.js";
import { schemaSignin } from "./schemaValidation.js";

const validateDataFromUser = {
  signup: (user) => schemaSignup.validate(user),
  signin: (user) => schemaSignin.validate(user),
};

export default validateDataFromUser;
