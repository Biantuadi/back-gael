import { Router } from "express";
import AuthMiddleware from "../../middlewares/authMiddleware";
import GenericController from "../../controllers/medias/index.ctrl";

const genericRoutes = (model: any) => {
  const router = Router();
  const controller = new GenericController(model);

  router.get("/", AuthMiddleware.isTokenValid, controller.getAll);
  router.get("/:id", AuthMiddleware.isTokenValid, controller.getById);
  router.post("/", AuthMiddleware.isAdmin, controller.create);
  router.put("/:id", AuthMiddleware.isAdmin, controller.update);
  router.delete("/:id", AuthMiddleware.isAdmin, controller.delete);

  return router;
};

export default genericRoutes;
