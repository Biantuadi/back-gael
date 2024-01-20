import { Router } from "express";
import AlbumController from "../../controllers/songs/album.ctrl";
import AuthMiddleware from "../../middlewares/authMiddleware";

const albumRoutes = Router();
const songController = new AlbumController();

albumRoutes.get("/", AuthMiddleware.isTokenValid, songController.getAll);
albumRoutes.get("/:id", AuthMiddleware.isTokenValid, songController.getById);
albumRoutes.post("/", AuthMiddleware.isTokenValid,AuthMiddleware.isAdmin, songController.create);
albumRoutes.put("/:id", AuthMiddleware.isAdmin, songController.update);
albumRoutes.delete("/:id", AuthMiddleware.isAdmin, songController.delete);

export { albumRoutes };
