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

//   public async uploadSong(req: Request, res: Response) {
//     try {
//       const song = await Song.findById(req.params.id);

//       if (!song) {
//         return res.status(404).json({ error: "Song not found" });
//       }

//       if (!req.files) {
//         return res.status(400).json({ error: "No file uploaded" });
//       }

//       const songTitle = song.title.replace(/\s/g, "-");

//       const songFile = req.files.song as UploadedFile;

//       if (!songFile) {
//         return res.status(400).json({ error: "No file uploaded" });
//       }

//       if (songFile.mimetype !== "audio/mpeg") {
//         return res.status(400).json({ error: "File type not supported" });
//       }

//       const songPath = path.join(
//         __dirname,
//         `../../public/songs/${songFile.name}` // ca va creer un dossier public et un dossier songs mais le ${songFile.name} va creer un fichier avec le nom du fichier uploader
//       );

//       songFile.mv(songPath, async (err) => {
//         if (err) {
//           console.error(err);
//           return res.status(500).json({ error: "Server error" });
//         }
//         song.song = `/songs/${songFile.name}`;
//         await song.save();
//         res.status(200).json(song);
//       });
//     } catch (error: any) {
//       res.status(500).json({ error: error.message });
//     }
//   }

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
