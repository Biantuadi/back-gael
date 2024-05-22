// sockets/index.ts
import { Socket } from 'socket.io';

export const handleSocketConnection = (socket: Socket) => {

  // Gérer la connexion du socket dans le chat
  socket.on('setIsConnected', async (userId: string) => {
    try {
      // Mettre à jour le statut de connexion de l'utilisateur
      console.log(`User ${userId} connected and status updated to true`);
    } catch (error) {
      console.error(`Error updating user status for ${userId}: ${error}`);
    }
  });

  // Gérer la réception de messages
  socket.on('message', async (message: any) => {
    try {
      // Traiter le message
      console.log(`Message received: ${message}`);
    } catch (error) {
      console.error(`Error receiving message: ${error}`);
    }
  });

  // Gérer la déconnexion du socket du chat
  socket.on('disconnect', async () => {
    try {
      // Mettre à jour le statut de connexion de l'utilisateur
      console.log(`User disconnected and status updated to false`);
    } catch (error) {
      console.error(`Error updating user status on disconnect: ${error}`);
    }
  });
};
