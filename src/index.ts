import express, { Application } from 'express';
import { userRoutes } from './routes/user.routes';
import { authRoutes } from './routes/auth.routes';
// import {ticketRoutes} from './routes/ticket.routes';
// import {eventRoutes} from './routes/event.routes';
import config from './config/env.config';

const {port, frontUrl, mongoUrl} = config;

if (!port || !frontUrl || !mongoUrl) {
  console.error('Veuillez renseigner les variables d\'environnement');
  process.exit(1);
}

const app: Application = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', frontUrl);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(express.urlencoded({ extended: true }));

// Connect to DB
import './db/mongoDB';

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
// app.use('/tickets', ticketRoutes);
// app.use('/events', eventRoutes);


app.get('/', (req, res) => {
  res.send('Bienvenue sur mon API !');
});

// Start the server
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le PORT ${port}`);
});