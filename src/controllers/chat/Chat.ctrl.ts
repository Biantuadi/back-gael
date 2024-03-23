import { Socket } from 'socket.io';
import MessageModel, { IMessage } from '../../models/chat/message.model';
import { User } from '../../models/user.model';
import { io } from '../../app';

export default class ChatController {
  async handleMessage(socket: Socket, messageData: { sender: string, receiver: string, message: string }) {
    try {
      // Créer une nouvelle instance de message à partir des données
      const message: IMessage = new MessageModel({
        sender: messageData.sender,
        receiver: messageData.receiver,
        message: messageData.message
      });

      // Sauvegarder le message en base de données
      await message.save();

      // Émettre le message à l'émetteur
      socket.emit('messageSent', message);

      // Trouver le socket du destinataire
      const receiverSocket = io.sockets.sockets.get(messageData.receiver);

      // Si le socket du destinataire existe, lui émettre le message
      if (receiverSocket) {
        receiverSocket.emit('messageReceived', message);
      }
    } catch (error) {
      console.error(`Error sending message: ${error}`);
    }
  }

  async handleConnection(socket: Socket) {
    console.log(`User connected: ${socket.id}`);

    // Gérer la connexion du socket dans le chat
    socket.on('setIsConnected', async (userId: string) => {
      try {
        const user = await User.findByIdAndUpdate(userId, { isConnected: true }, { new: true });
        console.log(`User ${userId} connected and status updated to true`);
      } catch (error) {
        console.error(`Error updating user status for ${userId}: ${error}`);
      }
    });

    // Gérer la déconnexion du socket du chat
    socket.on('disconnect', async () => {
      try {
        const user:any = await User.findOneAndUpdate({ socketId: socket.id }, { isConnected: false, socketId: null }, { new: true });
        console.log(`User ${user.id} disconnected and status updated to false`);
      } catch (error) {
        console.error(`Error updating user status on disconnect: ${error}`);
      }
    });
  }
}
