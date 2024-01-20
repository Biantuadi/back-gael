import mongoose from "mongoose";
import { ISong } from "../../types/mainDB.type";

const songSchema = new mongoose.Schema({
    title: {type: String, required: true},
    artist: {type: String, required: false},
    album: {type: String, required: false},
    songLink: {type: String, required: false},
    year: {type: Number, required: true},
    imgSong: {type: String, required: false},
    createdAt: {type: Date, default: Date.now}
});

const Song = mongoose.model<ISong>("Song", songSchema);

export default Song;