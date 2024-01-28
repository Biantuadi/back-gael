import { Router } from 'express';
import { Model, Document } from 'mongoose';
import AuthMiddleware from '../../middlewares/authMiddleware';
import GenericController from '../../controllers/medias/index.ctrl';

function generateRoutesAndController<T extends Document>(
  model: Model<T>,
  path: string
) {
  const router = Router();
  const controller = new GenericController(model);

  router.get('/', AuthMiddleware.isTokenValid, controller.getAll);
  router.get('/:id', AuthMiddleware.isTokenValid, controller.getById);
  router.post('/', AuthMiddleware.isAdmin, controller.create);
  router.put('/:id', AuthMiddleware.isAdmin, controller.update);
  router.delete('/:id', AuthMiddleware.isAdmin, controller.delete);

  return { router, path };
}

export default generateRoutesAndController;
