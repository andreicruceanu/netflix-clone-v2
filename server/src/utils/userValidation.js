import schemaSignup from "./schemaValidationSignUp.js";

const validateDataFromUser = {
  signup: (user) => schemaSignup.validate(user),
};

export default validateDataFromUser;
