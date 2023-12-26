import mongoose from "mongoose";
import { IfactureAlbum } from "../types/mainDB.model";

const factureAlbumSchema = new mongoose.Schema({
    album: {
        type: String,
        required: [true, "Album is required"],
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

const FactureAlbum = mongoose.model<IfactureAlbum>("FactureAlbum", factureAlbumSchema);

export default FactureAlbum;