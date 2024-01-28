import { Model, Document } from 'mongoose';
import { Request, Response } from 'express';

export default class GenericController<T extends Document> {
  constructor(private model: Model<T>) {}

  public async getAll(req: Request, res: Response) {
    try {
      const items = await this.model.find();
      res.status(200).json(items);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async getById(req: Request, res: Response) {
    try {
      const item = await this.model.findById(req.params.id);
      res.status(200).json(item);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const item = await this.model.create(req.body);
      res.status(201).json(item);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const item = await this.model.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ error: `${this.model.modelName} not found` });
      }
      await this.model.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({ message: `${this.model.modelName} updated` });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const item = await this.model.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ error: `${this.model.modelName} not found` });
      }
      await item.deleteOne();
      res.status(200).json({ message: `${this.model.modelName} deleted` });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
