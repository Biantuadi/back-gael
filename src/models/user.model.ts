import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcrypt";
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

// Plugin uniqueValidator pour garantir que les emails sont uniques
userSchema.plugin(uniqueValidator, { message: "{PATH} must be unique" });

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Création du modèle User avec le schéma
export const User = mongoose.model<IUser>("User", userSchema);
