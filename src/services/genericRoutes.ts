import { Router } from 'express';
import { Model, Document } from 'mongoose';
import { Request, Response } from 'express';
import AuthMiddleware from '../middlewares/authMiddleware';

function generateRoutesController<T extends Document>(
  model: Model<T>,
  path: string
) {
  const router = Router();
  const controller = {
    getAll: async (req: Request, res: Response) => {
      try {
        const items = await model.find();
        res.status(200).json(items);
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    },

    getById: async (req: Request, res: Response) => {
      try {
        const item = await model.findById(req.params.id);
        res.status(200).json(item);
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    },

    create: async (req: Request, res: Response) => {
      try {
        const item = await model.create(req.body);
        res.status(201).json(item);
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    },

    update: async (req: Request, res: Response) => {
      try {
        const item = await model.findById(req.params.id);
        if (!item) {
          return res.status(404).json({ error: `${path} not found` });
        }
        await model.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ message: `${path} updated` });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    },

    delete: async (req: Request, res: Response) => {
      try {
        const item = await model.findById(req.params.id);
        if (!item) {
          return res.status(404).json({ error: `${path} not found` });
        }
        await item.deleteOne();
        res.status(200).json({ message: `${path} deleted` });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    },
  };

  router.get('/', AuthMiddleware.isTokenValid, controller.getAll);
  router.get('/:id', AuthMiddleware.isTokenValid, controller.getById);
  router.post('/', AuthMiddleware.isAdmin, controller.create);
  router.put('/:id', AuthMiddleware.isAdmin, controller.update);
  router.delete('/:id', AuthMiddleware.isAdmin, controller.delete);

  return { router, controller };
}

export default generateRoutesController;
