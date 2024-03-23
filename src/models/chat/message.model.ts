import mongoose from "mongoose";
// import { IMessage } from "../../types/mainDB.type";

import { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  sender: string; 
  receiver: string; 
  message: string; 
  timestamp: Date; 
}

const MessageSchema: Schema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    message: { type: String, required: true }, 
    timestamp: { type: Date, default: Date.now } 
  });
  
  // Créer un modèle à partir du schéma
  const MessageModel = mongoose.model<IMessage>('Message', MessageSchema);
  
  export default MessageModel;
  