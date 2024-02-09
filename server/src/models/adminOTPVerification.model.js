import mongoose from "mongoose";
import crypto from "crypto";
const adminOTPVerificationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  createdAt: Date,
  expiresAt: Date,
});
adminOTPVerificationSchema.methods.hashOTP = function (otp) {
  this.salt = crypto.randomBytes(16).toString("hex");

  this.otp = crypto
    .pbkdf2Sync(otp, this.salt, 1000, 64, "sha512")
    .toString("hex");
};
adminOTPVerificationSchema.methods.verifyOTP = function (otp) {
  const hash = crypto
    .pbkdf2Sync(otp, this.salt, 1000, 64, "sha512")
    .toString("hex");

  return this.otp === hash;
};

const adminOTPModel = mongoose.model("AdminOTP", adminOTPVerificationSchema);

export default adminOTPModel;
