import mongoose from "mongoose";
import { IEnseignement } from "../../types/mainDB.type";

const enseignementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    thumbnail: { type: String },
    audioLink: { type: String, required: true },
    description: { type: String },
    date: { type: Date },
    createdAt: { type: Date, default: Date.now },
});

const Enseignement = mongoose.model<IEnseignement>("Enseignement", enseignementSchema);

export default Enseignement;