import { Socket } from 'socket.io';
import Chat from '../models/chats.model';  
import Message from '../models/message.model';  
import { User } from '../models/user.model';
import { IUser } from '../types/mainDB.type';
import { IChat } from '../types/mainDB.type';
import { IMessage } from '../types/mainDB.type';

interface ChatMessage {
  sender: string;
  receiver: string;
  message: string;
}

interface TypingStatus {
  sender: string;
  receiver: string;
  isTyping: boolean;
}

class ChatController {
  async handleConnection(socket: Socket) {
    console.log(`User connected: ${socket.id}`);

    // Mise à jour du statut isConnected de l'utilisateur
    socket.on('setIsConnected', async (userId: string) => {
      try {
        const user = await User.findByIdAndUpdate(userId, { isConected: true }, { new: true });
        console.log(`User ${userId} connected and status updated to true`);
      } catch (error) {
        console.error(`Error updating user status for ${userId}: ${error}`);
      }
    });

    // Écouter l'événement de message
    socket.on('chatMessage', async (data: ChatMessage) => {
      console.log('Message reçu:', data);

      // Enregistrez le message dans la base de données
      const chat = await Chat.findOneAndUpdate(
        {
          $or: [
            { user1: data.sender, user2: data.receiver },
            { user1: data.receiver, user2: data.sender }
          ]
        },
        {
          $push: {
            messages: {
              user: data.sender,
              message: data.message,
              isRead: false,
              isTyping: false,
            },
          },
        },
        { new: true, upsert: true }
      );

      // Émettre le message à tous les clients connectés
      socket.to(data.receiver).emit('chatMessage', data);
    });

    // Écouter l'événement d'écriture (typing)
    socket.on('typing', async (data: TypingStatus) => {
      console.log('Typing:', data);

      // Enregistrez l'état d'écriture dans la base de données
      const chat = await Chat.findOneAndUpdate(
        {
          $or: [
            { user1: data.sender, user2: data.receiver },
            { user1: data.receiver, user2: data.sender }
          ]
        },
        {
          $set: {
            'messages.$[elem].isTyping': data.isTyping,
          },
        },
        {
          arrayFilters: [{ 'elem.user': data.sender }],
          new: true,
        }
      );

      // Émettre l'état d'écriture à l'utilisateur destinataire
      socket.to(data.receiver).emit('typing', data);
    });

    socket.on('disconnect', async () => {
      console.log(`User disconnected: ${socket.id}`);

      // Mise à jour du statut isConnected de l'utilisateur
      const user = await User.findOneAndUpdate({ socketId: socket.id }, { isConected: false }, { new: true });
      console.log(`User ${user?.id} disconnected and status updated to false`);
    });
  }
}

export default new ChatController();

