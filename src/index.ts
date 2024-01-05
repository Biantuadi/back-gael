import express, { Application } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import config from './config/env.config';
import './db/mongoDB'; // Connect to MongoDB
import ChatController from './controllers/Chat.ctrl';

const { port, mongoUrl } = config;

if (!port || !mongoUrl) {
  console.error('Veuillez renseigner les variables d\'environnement');
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
app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
import { authRoutes } from './routes/auth.routes';
import { userRoutes } from './routes/user.routes';
// import { ticketRoutes } from './routes/ticket.routes';
// import { eventRoutes } from './routes/event.routes';

// Les routes API
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
// app.use('/tickets', ticketRoutes);
// app.use('/events', eventRoutes);

app.get('/', (req, res) => {
  res.send('Bienvenue sur gaël api !');
});



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
