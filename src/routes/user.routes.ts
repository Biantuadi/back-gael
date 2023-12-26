import { Router } from "express";
import UserController from "../controllers/user.controller";
import AuthMiddleware from '../middlewares/authMiddleware';

const userRoutes = Router();
const userController = new UserController();

userRoutes.get("/", userController.getAll);
userRoutes.get("/me", userController.getMe);
// userRoutes.get('/:id', AuthMiddleware.isTokenValid,  userController.getById);
// userRoutes.post('/', AuthMiddleware.isAdmin, userController.create); // pour le super admin qui peut créer des utilisateurs
userRoutes.put('/:id', AuthMiddleware.isTokenValid, userController.updateUser);
userRoutes.delete(
  "/:id",
  AuthMiddleware.isTokenValid,
  AuthMiddleware.isAdminOrUser,
  userController.deleteUser
); 

export { userRoutes };