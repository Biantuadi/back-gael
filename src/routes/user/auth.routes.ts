import  AuthController  from '../../controllers/users/auth.ctrl';
import {Router} from 'express';

const authRoutes = Router();
const authController = new AuthController();

// login & signup
authRoutes.post('/login', authController.login);
authRoutes.post('/register', authController.signup);

// update password
authRoutes.put('/updatePassword', authController.updateUserPassword);

// remove db
authRoutes.delete('/deleteAll', authController.deleteAll);

export {authRoutes};