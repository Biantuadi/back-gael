import mongoose from "mongoose";
import { IPodcast } from "../../types/mainDB.type";

const podcastSchema = new mongoose.Schema({
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    audioLink: { type: String, required: true },
    description: { type: String },
    date: { type: Date },
    createdAt: { type: Date, default: Date.now },
});

const Podcast = mongoose.model<IPodcast>("Podcast", podcastSchema);

export default Podcast;