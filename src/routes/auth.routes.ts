import  AuthController  from '../controllers/auth.ctrl';
import {Router} from 'express';

const authRoutes = Router();
const authController = new AuthController();

// login & signup
authRoutes.post('/login', authController.login);
authRoutes.post('/register', authController.signup);

// remove db
authRoutes.delete('/deleteAll', authController.deleteAll);

export {authRoutes};