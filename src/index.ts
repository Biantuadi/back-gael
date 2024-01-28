import app, { httpServer, io } from './app';
import './db/mongoDB'; // Connect to MongoDB
import config from './config/env.config';
import router from './routes/index.routes';
import { handleSocketConnection } from './sockets/index.socket';

const port = config.port;

// Routes
app.use(router);

// Socket.IO connection handling
io.on('connection', handleSocketConnection);

// Start the server
httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
