// sockets/index.ts
import { Socket } from 'socket.io';
import ChatController from '../controllers/chat/Chat.ctrl';

export const handleSocketConnection = (socket: Socket) => {
  console.log(`User connected: ${socket.id}`);

  // Gérer la connexion du socket dans le chat
  const chatController = new ChatController();
  chatController.handleConnection(socket);

  // Gérer la réception de messages
  socket.on('sendMessage', (messageData: { sender: string, receiver: string, message: string }) => {
    chatController.handleMessage(socket, messageData);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
};
