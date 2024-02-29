import Chat from '../../models/chat/chats.model';
import { User } from '../../models/user.model';
import { Socket } from 'socket.io';
import { io } from '../../app';

interface ChatMessage {
  sender: string;
  receiver: string;
  message: string;
}

export default class ChatController {
  async handleConnection(socket: Socket) {
    console.log(`User connected: ${socket.id}`);

    // Mise à jour du statut isConnected de l'utilisateur
    socket.on('setIsConnected', async (userId: string) => {
      try {
        const user = await User.findByIdAndUpdate(userId, { isConnected: true }, { new: true });
        console.log(`User ${userId} connected and status updated to true`);
      } catch (error) {
        console.error(`Error updating user status for ${userId}: ${error}`);
      }
    });

    // Autres méthodes de gestion de chat...

  }

  async sendMessage(data: ChatMessage): Promise<void> {
    try {
      // Vérifiez si la conversation existe déjà ou créez-la si elle n'existe pas
      const conversation = await Chat.findOne({
        $or: [
          { participants: [data.sender, data.receiver] },
          { participants: [data.receiver, data.sender] }
        ]
      });

      let conversationId = '';
      if (conversation) {
        conversationId = conversation._id;
      } else {
        const newConversation = new Chat({ participants: [data.sender, data.receiver] });
        const savedConversation = await newConversation.save();
        conversationId = savedConversation._id;
      }

      // Enregistrez le message dans la conversation
      await Chat.findByIdAndUpdate(conversationId, { $push: { messages: data } }, { new: true });

      // Émettez un événement 'newMessage' pour informer les utilisateurs concernés
      io.to(data.receiver).emit('newMessage', data);

      console.log(`Message sent from ${data.sender} to ${data.receiver}: ${data.message}`);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
}
