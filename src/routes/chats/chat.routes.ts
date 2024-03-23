import ChatController from '../../controllers/chat/Chat.ctrl';

import { Router } from 'express';

const chatRoutes = Router();
const chatController = new ChatController();

// Route pour envoyer un message
// chatRoutes.post('/messages', chatController.sendMessage);

export default chatRoutes;
