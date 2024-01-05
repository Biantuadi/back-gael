// chat.routes.ts
import { Router } from 'express';
import ChatController from '../controllers/chat.ctrl';
import AuthMiddleware from '../middlewares/authMiddleware';

const chatRoutes = Router();
const chatController = new ChatController();

// Middleware d'authentification pour s'assurer que l'utilisateur est connecté
chatRoutes.use(AuthMiddleware.isTokenValid);

// Routes du chat
chatRoutes.get('/user/:userId', chatController.getChatByUser);
chatRoutes.post('/:chatId/message', chatController.sendMessage);
chatRoutes.get('/:chatId/messages', chatController.getChatMessages);

export { chatRoutes };
