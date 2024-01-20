import mongoose from "mongoose";
import { IChat } from "../../types/mainDB.type";
import { IMessage } from "../../types/mainDB.type";

const chatSchema = new mongoose.Schema({
    id: {type: String, required: true},
    user1: {type: String, required: true},
    user2: {type: String, required: true},
    messages: {type: Array<IMessage>(), required: true},
    createdAt: {type: Date, default: Date.now}
});

const Chat = mongoose.model<IChat>("Chat", chatSchema);

export default Chat;