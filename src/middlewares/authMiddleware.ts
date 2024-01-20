import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET as string;

export default class AuthMiddleware {

    public static async isTokenValid(
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> {
      try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
          res.status(401).json({ message: "Pas de jeton, autorisation refusée" });
          return;
        }
  
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string }; // Supposons que l'ID est une chaîne
        req.body.user = decoded;
        next();
      } catch (error: any) {
        console.error("Une erreur s'est produite lors du traitement de la demande :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors du traitement de la demande" });
      }
    }

  public static async isAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        res.status(401).json({ message: "No token, authorization denied" });
        return;
      }
      const decoded: any = jwt.verify(token, JWT_SECRET);
      if (decoded.role !== "ADMIN") {
        res.status(401).json({ message: "Please login as admin" });
        return;
      }
      req.body.user = decoded;
      next();
    } catch (error: any) {
      console.error("An error occurred while processing the request:", error);
      res
        .status(500)
        .json({ message: "An error occurred while processing the request" });
    }
  }

  public static async isCreator(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        res.status(401).json({ message: "No token, authorization denied" });
        return;
      }
      const decoded: any = jwt.verify(token, JWT_SECRET);
      if (decoded.role !== "creator") {
        res.status(401).json({ message: "No token, authorization denied" });
        return;
      }
      req.body.user = decoded;
      next();
    } catch (error: any) {
      console.error("An error occurred while processing the request:", error);
      res
        .status(500)
        .json({ message: "An error occurred while processing the request" });
    }
  }

  // admin or user : pour les routes qui peuvent être accédées par les admins et les utilisateurs
  public static async isAdminOrUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        res.status(401).json({ message: "No token, authorization denied" });
        return;
      }
      const decoded: any = jwt.verify(token, JWT_SECRET);
      if (decoded.role !== "admin" && decoded.role !== "user") {
        res.status(401).json({ message: "No token, authorization denied" });
        return;
      }
      req.body.user = decoded;
      next();
    } catch (error: any) {
      console.error("An error occurred while processing the request:", error);
      res
        .status(500)
        .json({ message: "An error occurred while processing the request" });
    }
  }
  
}