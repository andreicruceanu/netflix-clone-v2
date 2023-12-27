import Joi from "joi";

const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const handleError = (error) => {
  error.forEach((err) => {
    switch (err.code) {
      case "any.required":
        err.message = `${err.local.label} is required`;
        break;
      case "string.empty":
        err.message = `${err.local.label} is empty`;
        break;
      case "string.min":
        err.message = `${err.local.label} length must be at least ${err.local.limit} characters long`;
        break;
      case "string.email":
        err.message = `${err.local.label} is invalid`;
        break;
      case "string.pattern.base":
        err.message = `The password must have at least 8 characters, uppercase, lowercase, a number and a special character`;
        break;
      case "any.only":
        err.message = `${err.local.label} must be one of ${err.local.valids}`;
        break;
      case "number.base":
        err.message = `${err.local.label} must be a number`;
      default:
        return err;
    }
  });

  return error;
};

export const schemaSignup = Joi.object({
  firstName: Joi.string().min(3).required().error(handleError),
  lastName: Joi.string().min(3).required().error(handleError),
  email: Joi.string().email().required().error(handleError),
  password: Joi.string()
    .min(8)
    .required()
    .regex(regexPassword)
    .error(handleError),
});

export const schemaSignin = Joi.object({
  email: Joi.string().email().required().error(handleError),
  password: Joi.string()
    .required()
    .min(8)
    .regex(regexPassword)
    .error(handleError),
});

export const schemaUpdatePassword = Joi.object({
  oldPassword: Joi.string()
    .required()
    .min(8)
    .regex(regexPassword)
    .error(handleError),
  password: Joi.string()
    .required()
    .min(8)
    .regex(regexPassword)
    .error(handleError),
  confirmPassword: Joi.string().required().error(handleError),
});

export const schemaUpdateUser = Joi.object({
  firstName: Joi.string().min(3).required().error(handleError),
  lastName: Joi.string().min(3).required().error(handleError),
  profilePicture: Joi.required(false),
});

export const schemaChangeEmail = Joi.object({
  oldEmail: Joi.string().email().required().error(handleError),
  newEmail: Joi.string().email().required().error(handleError),
  password: Joi.string()
    .required()
    .min(8)
    .regex(regexPassword)
    .error(handleError),
});

export const schemaPreferences = Joi.object({
  type: Joi.string()
    .required()
    .valid("like", "dislike", "none")
    .error(handleError),
  mediaId: Joi.number().required().error(handleError),
  mediaType: Joi.string().required().valid("tv", "movie").error(handleError),
});

export const schemaReview = Joi.object({
  title: Joi.string().required().error(handleError),
  content: Joi.string().required().error(handleError),
  mediaId: Joi.number().required().error(handleError),
  mediaPoster: Joi.string().required().error(handleError),
  mediaType: Joi.string().required().valid("tv", "movie").error(handleError),
  mediaTitle: Joi.string().required().error(handleError),
  rating: Joi.number().required().valid(1, 2, 3, 4, 5).error(handleError),
});
