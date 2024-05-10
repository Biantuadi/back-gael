import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { IUser } from "../types/mainDB.type";
import { strBase64Avatar } from "./base64_avatar/default_avatar";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "First name is required"],
  },
  lastname: {
    type: String,
    required: [true, "Last name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    lowercase: true,
  },
  avatar: {
    type: String,
    default: strBase64Avatar,
  },
  phone: {
    type: String,
  },
  birthDate: {
    type: Date,
  },
  bio: {
    type: String,
  },
  address: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
    default: "USER",
  },
  isConected: { 
    type: Boolean,
    default: false,
  },
  preferences: {
    theme: {
      type: String,
      default: "light",
    },
    language: {
      type: String,
      default: "fr",
    },
    notifications: {
      type: Boolean,
      default: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.plugin(uniqueValidator, { message: "{PATH} must be unique" });

export const User = mongoose.model<IUser>("User", userSchema);