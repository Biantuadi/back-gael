import { Router } from "express";
import UserController from "../../controllers/users/user.controller";
import AuthMiddleware from '../../middlewares/authMiddleware';

const userRoutes = Router();
const userController = new UserController();

userRoutes.get("/", AuthMiddleware.isTokenValid, userController.getAll);
userRoutes.get("/me", AuthMiddleware.isTokenValid, userController.getMe);
// userRoutes.get('/:id', AuthMiddleware.isTokenValid,  userController.getById);
// userRoutes.post('/', AuthMiddleware.isAdmin, userController.create); // pour le super admin qui peut créer des utilisateurs
userRoutes.put('/:id', AuthMiddleware.isTokenValid, userController.updateUser);
// upload avatar
userRoutes.post(
  "/avatar",
  AuthMiddleware.isTokenValid,
  userController.uploadAvatar
);
userRoutes.delete(
  "/:id",
  AuthMiddleware.isTokenValid,
  AuthMiddleware.isAdminOrUser,
  userController.deleteUser
); 

export { userRoutes };