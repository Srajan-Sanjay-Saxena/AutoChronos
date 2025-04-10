import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import validator from "validator";
import { mongoInstance } from "../Mongo/Connection.js";
import type { UserNamespace } from "../Types/model.types.js";

export const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    validate: validator.isEmail,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

userSchema.methods.comparePassword = async (
  candidatePassword: string,
  storedPassword: string
) => {
  return await bcrypt.compare(candidatePassword, storedPassword);
};

export const UserModel = mongoInstance.getModel<
  typeof userSchema,
  UserNamespace.UserMethods,
  {}
>("user", userSchema);
