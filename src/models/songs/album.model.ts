import mongoose from "mongoose";
import { IAlbum } from "../../types/mainDB.type";

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Name is required"],
  },
  subtitle: {
    type: String,
  },
  artist: {
    type: String,
    required: [true, "Artist is required"],
  },
  year: {
    type: Number,
    required: [true, "Year is required"],
  },
  imgAlbum: {
    type: String,
    default:
      "https://as2.ftcdn.net/v2/jpg/05/17/66/89/1000_F_517668991_LZAIKXcvnpbMewxYumyvAAI45JM2eX7E.jpg",
  },
  genre: {
    type: String,
  },
  songs: {
    type: [String],
  },
  usersBuy: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Album = mongoose.model<IAlbum>("Album", albumSchema);

export default Album;
