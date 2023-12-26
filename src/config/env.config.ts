import dotenv from "dotenv";

dotenv.config();

interface AppConfig {
  devMod: boolean;
  port: number;
  jwtSecret: string;
  tokenExpiration: string;
  mongoUrl: string;
  frontUrl: string;
}

const {
  DEV_MODE,
  PORT = "8080",
  JWT_SECRET,
  TOKEN_EXPIRATION,
  DEV_MONGO_URL,
  DEV_FRONT_URL,
  PROD_MONGO_URL,
  PROD_FRONT_URL,
} = process.env;

const devMod = DEV_MODE ? JSON.parse(DEV_MODE.toLowerCase()) : false;

const config: AppConfig = {
  devMod,
  port: parseInt(PORT),
  jwtSecret: JWT_SECRET || "",
  tokenExpiration: TOKEN_EXPIRATION || "",
  mongoUrl: devMod ? DEV_MONGO_URL || "" : PROD_MONGO_URL || "",
  frontUrl: devMod ? DEV_FRONT_URL || "" : PROD_FRONT_URL || "",
};

export default config;