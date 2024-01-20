import mongoose, { ConnectOptions } from "mongoose";
import config from '../config/env.config';

const { mongoUrl } = config as { mongoUrl: string };

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => console.log("Connecté à MongoDB"))
  .catch((err) => console.log("Erreur de connexion à MongoDB : ", err));
  
export default mongoose;