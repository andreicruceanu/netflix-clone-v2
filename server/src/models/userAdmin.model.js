import mongoose from "mongoose";
import modelOptions from "./model.options.js";
import crypto from "crypto";

const userAdminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      select: false,
    },
    salt: {
      type: String,
      required: true,
      select: false,
    },
    isActive: {
      type: Boolean,
      required: false,
      default: false,
    },
    changePassword: {
      type: Boolean,
      required: false,
      default: false,
    },
    twoFactorAuth: {
      type: Boolean,
      required: false,
      default: true,
    },
    role: {
      type: String,
      enum: ["admin", "guest", "owner"],
      required: true,
    },
  },
  modelOptions
);

userAdminSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");

  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};
userAdminSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");

  return this.password === hash;
};

const userAdminModel = mongoose.model("AdminUsers", userAdminSchema);

export default userAdminModel;
