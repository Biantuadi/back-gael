import { Router } from "express";
import SongController from "../../controllers/songs/song.controller";
import AuthMiddleware from "../../middlewares/authMiddleware";

const songRoutes = Router();
const songController = new SongController();

songRoutes.get("/", AuthMiddleware.isTokenValid, songController.getAll);
songRoutes.get("/:id", AuthMiddleware.isTokenValid, songController.getById);
songRoutes.post("/", AuthMiddleware.isTokenValid,AuthMiddleware.isAdmin, songController.create);
songRoutes.put("/:id", AuthMiddleware.isAdmin, songController.update);
songRoutes.delete("/:id", AuthMiddleware.isAdmin, songController.delete);

export { songRoutes };
