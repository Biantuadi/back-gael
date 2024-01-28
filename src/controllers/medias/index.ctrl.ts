import { Request, Response } from 'express';
import { Model } from 'mongoose';

export default class GenericController {
  private model: Model<any>;

  constructor(model: Model<any>) {
    this.model = model;
  }

  public getAll = async (req: Request, res: Response) => {
    try {
      const items = await this.model.find();
      res.status(200).json(items);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public getById = async (req: Request, res: Response) => {
    try {
      const item = await this.model.findById(req.params.id);
      res.status(200).json(item);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public create = async (req: Request, res: Response) => {
    try {
      const item = await this.model.create(req.body);
      res.status(201).json(item);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public update = async (req: Request, res: Response) => {
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

  public delete = async (req: Request, res: Response) => {
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
