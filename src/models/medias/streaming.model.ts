import mongoose from "mongoose";
import { IStreaming } from "../../types/mainDB.type";

const streamingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    videoLink: { type: String, required: true },
    description: { type: String },
    date: { type: Date },
    createdAt: { type: Date, default: Date.now },
});

const Streaming = mongoose.model<IStreaming>("Streaming", streamingSchema);

export default Streaming;