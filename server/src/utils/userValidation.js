import {
  schemaAddVideoMovie,
  schemaChangeEmail,
  schemaPreferences,
  schemaReview,
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
  preferences: (preferencesData) => schemaPreferences.validate(preferencesData),
  createReview: (review) => schemaReview.validate(review),
  addVideoMovie: (data) => schemaAddVideoMovie.validate(data),
};

export default validateDataFromUser;
