import express, { Application } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import config from './config/env.config';
import './db/mongoDB'; // Connect to MongoDB
import ChatController from './controllers/chat/Chat.ctrl';
import { authRoutes } from './routes/auth.routes';
import { userRoutes } from './routes/user.routes';
import fileUpload from 'express-fileupload';

const { port } = config;

if (!port) {
  console.error('Veuillez renseigner la variable d\'environnement pour le port');
  process.exit(1);
}

const app: Application = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  }
});

// Middleware
app.use(express.json({ limit: '1mb' }));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Socket.IO connection handling
io.on('connection', (socket: Socket) => {
  console.log(`User connected: ${socket.id}`);

  // Gérer la connexion du socket dans le chat
  ChatController.handleConnection(socket);

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start the server
httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
