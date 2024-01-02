import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

import { IEvent } from "../types/mainDB.type";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "Title is required"],
  },
  img: {
    type: String,
    default:
      "https://as2.ftcdn.net/v2/jpg/05/17/66/89/1000_F_517668991_LZAIKXcvnpbMewxYumyvAAI45JM2eX7E.jpg",
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
  },
  tickets: {
    type: [String],
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
  time: {
    type: String,
    required: [true, "Time is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

eventSchema.plugin(uniqueValidator);

const Event = mongoose.model<IEvent>("Event", eventSchema);

export default Event;
