import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface IUser extends mongoose.Document {
  id: string;
  firstName: string;
  email: string;
  lastName: string;
  imgProfile?: string;
  phone?: string;
  birthDate?: Date;
  bio?: string;
  address?: string;
  password: string;
  role?: string;
  preferences?: {
    theme: string;
    language: string;
    notifications: boolean;

  };
  eventInterest?: string[];
  createdAt?: Date;
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    lowercase: true,
  },
  imgProfile: {
    type: String,
    default: "https://as2.ftcdn.net/v2/jpg/05/17/66/89/1000_F_517668991_LZAIKXcvnpbMewxYumyvAAI45JM2eX7E.jpg",
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
  eventInterest: {
    type: [String],
    default: ["Sport", "Culture", "Music"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.plugin(uniqueValidator, { message: "{PATH} must be unique" });

export const User = mongoose.model<IUser>("User", userSchema);