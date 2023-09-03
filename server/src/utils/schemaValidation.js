import Joi from "joi";

const handleError = (error) => {
  error.forEach((err) => {
    console.log(err);
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
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)
    .error(handleError),
});

export const schemaSignin = Joi.object({
  email: Joi.string().email().required().error(handleError),
  password: Joi.string()
    .min(8)
    .required()
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)
    .error(handleError),
});
