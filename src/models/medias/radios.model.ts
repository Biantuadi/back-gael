import mongoose from "mongoose";
import { IRadio } from "../../types/mainDB.type";

const radioSchema = new mongoose.Schema({
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    audioLink: { type: String, required: true },
    description: { type: String },
    date: { type: Date },
    createdAt: { type: Date, default: Date.now },
});

const Radio = mongoose.model<IRadio>("Radio", radioSchema);

export default Radio;