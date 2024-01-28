import express, { Application } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import config from './config/env.config';
import './db/mongoDB'; // Connect to MongoDB
import ChatController from './controllers/chat/Chat.ctrl';
import { authRoutes } from './routes/user/auth.routes';
import { userRoutes } from './routes/user/user.routes';
import fileUpload from 'express-fileupload';

//
import generateRoutesAndController from './routes/medias/index.routes';

import Album from './models/songs/album.model';
import Song from './models/songs/song.model';
import Event from './models/events/event.model';

const { router: songRoutes, path: songPath } = generateRoutesAndController(Song, '/songs');
const { router: albumRoutes, path: albumPath } = generateRoutesAndController(Album, '/albums');
const { router: eventRoutes, path: eventPath } = generateRoutesAndController(Event, '/events');
// const { router: streamingRoutes, path: streamingPath } = generateRoutesAndController(Streaming, '/streamings');
// const { router: enseignementRoutes, path: enseignementPath } = generateRoutesAndController(Enseignement, '/enseignements');
// const { router: radioRoutes, path: radioPath } = generateRoutesAndController(Radio, '/radios');
// const { router: podcastRoutes, path: podcastPath } = generateRoutesAndController(Podcast, '/podcasts');



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
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use(songPath, songRoutes);
app.use(albumPath, albumRoutes);
app.use(eventPath, eventRoutes);
// app.use(streamingPath, streamingRoutes);
// app.use(enseignementPath, enseignementRoutes);
// app.use(radioPath, radioRoutes);
// app.use(podcastPath, podcastRoutes);


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
