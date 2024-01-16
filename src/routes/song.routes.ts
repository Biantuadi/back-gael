import { Router } from "express";
import SongController from "../controllers/song.controller";
import AuthMiddleware from '../middlewares/authMiddleware';

const songRoutes = Router();
const songController = new SongController();

songRoutes.get("/", AuthMiddleware.isTokenValid, songController.getAll);
songRoutes.get("/:id", AuthMiddleware.isTokenValid, songController.getById);
songRoutes.post("/", AuthMiddleware.isAdmin, songController.create);
// upload song
songRoutes.post(
  "/song",
  AuthMiddleware.isAdmin,
  songController.uploadSong
);
songRoutes.put("/:id", AuthMiddleware.isAdmin, songController.update);
songRoutes.delete("/:id", AuthMiddleware.isAdmin, songController.delete);

export { songRoutes };