import Song from "../models/song.model";
import { Request, Response } from "express";
import path from "path";
import { UploadedFile } from "express-fileupload";

export default class SongController {
  public async getAll(req: Request, res: Response) {
    try {
      const songs = await Song.find();
      res.status(200).json(songs);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async getById(req: Request, res: Response) {
    try {
      const song = await Song.findById(req.params.id);
      res.status(200).json(song);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const song = await Song.create(req.body);
      res.status(201).json(song);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const song = await Song.findById(req.params.id);
      if (!song) {
        return res.status(404).json({ error: "Song not found" });
      }
      await Song.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({ message: "Song updated" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const song = await Song.findById(req.params.id);
      if (!song) {
        return res.status(404).json({ error: "Song not found" });
      }
      await song.deleteOne();
      res.status(200).json({ message: "Song deleted" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
