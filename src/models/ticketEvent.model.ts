import mongoose from "mongoose";
import { IticketEvent } from "../types/mainDB.model";

const ticketEventSchema = new mongoose.Schema({
  event: {
    type: String,
    required: [true, "Event is required"],
  },
  user: {
    type: String,
    required: [true, "User is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TicketEvent = mongoose.model<IticketEvent>(
  "TicketEvent",
  ticketEventSchema
);

export default TicketEvent;
