import Joi from "joi";

const handleError = (error) => {
  error.forEach((err) => {
    switch (err.code) {
      case "string.empty":
        err.message = `${err.local.label} is required`;
        break;
      default:
        break;
    }
  });

  return error;
};

const schemaSignup = Joi.object({
  firstName: Joi.string().min(3).required().error(handleError),
  lastName: Joi.string().min(2).required().error(handleError),
  email: Joi.string().email().required().error(handleError),
  password: Joi.string()
    .min(8)
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)
    .required("Parola este Obligatorie"),
});

export default schemaSignup;
