import { schemaCreateAdmin, schemaLoginAdmin } from "./schemaValidation.js";

const schemaAdminValidate = {
  createAdmin: (admin) => schemaCreateAdmin.validate(admin),
  login: (admin) => schemaLoginAdmin.validate(admin),
};

export default schemaAdminValidate;
