import Album from "../../models/songs/album.model";
import { Request, Response } from "express";

export default class AlbumController {
  public async getAll(req: Request, res: Response) {
    try {
      const albums = await Album.find();
      res.status(200).json(albums);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async getById(req: Request, res: Response) {
    try {
      const album = await Album.findById(req.params.id);
      res.status(200).json(album);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const album = await Album.create(req.body);
      res.status(201).json(album);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const album = await Album.findById(req.params.id);
      if (!album) {
        return res.status(404).json({ error: "Album not found" });
      }
      await Album.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({ message: "Album updated" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const album = await Album.findById(req.params.id);
      if (!album) {
        return res.status(404).json({ error: "Album not found" });
      }
      await album.deleteOne();
      res.status(200).json({ message: "Album deleted" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}