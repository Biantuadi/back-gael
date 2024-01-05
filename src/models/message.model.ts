import mongoose from "mongoose";
import { IMessage } from "../types/mainDB.type";

const messageSchema = new mongoose.Schema({
    id: {type: String, required: true},
    user: {type: String, required: true},
    message: {type: String, required: true},
    isRead: {type: Boolean, required: true},
    isTyping: {type: Boolean, required: true},
    createdAt: {type: Date, default: Date.now}
});

const Message = mongoose.model<IMessage>("Message", messageSchema);

export default Message;
