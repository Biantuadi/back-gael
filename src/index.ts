import express, { Application } from 'express';
import { userRoutes } from './routes/user.routes';
import { authRoutes } from './routes/auth.routes';
// import {ticketRoutes} from './routes/ticket.routes';
// import {eventRoutes} from './routes/event.routes';
import config from './config/env.config';
import cors from 'cors';

const {port, mongoUrl} = config;

if (!port || !mongoUrl) {
  console.error('Veuillez renseigner les variables d\'environnement');
  process.exit(1);
}

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.static('public')); // Pour servir les fichiers statiques
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to DB
import './db/mongoDB';

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
// app.use('/tickets', ticketRoutes);
// app.use('/events', eventRoutes);


app.get('/', (req, res) => {
  res.send('Bienvenue sur gaël api !');
});

// Start the server
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le PORT ${port}`);
});