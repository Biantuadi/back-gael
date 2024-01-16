import { User } from "../models/user.model";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { UploadedFile } from "express-fileupload";


export default class UserController {
  public async getMe(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findById(req.query.userId);
      if (!user) {
        res.status(400).json({ message: "User not found" });
        return;
      }
      const userWithoutPassword = { ...user.toObject(), password: undefined };
      res.status(200).json(userWithoutPassword);
    } catch (error: any) {
      console.error("An error occurred while processing the request:", error);
      res
        .status(500)
        .json({ message: "An error occurred while processing the request" });
    }
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find();
      const usersWithoutPasswords = users.map((user) => {
        return { ...user.toObject(), password: undefined };
      });

      res.status(200).json(usersWithoutPasswords);
    } catch (error: any) {
      res.status(500).json(error);
    }
  }

  public async uploadAvatar(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req.body.user as { userID: string }).userID;

      if (!req.files || Object.keys(req.files).length === 0 || !req.files.avatar) {
        res.status(400).json({ message: "Aucun fichier d'avatar n'a été téléchargé." });
        return;
      }

      const avatarFile = req.files.avatar as UploadedFile;
      const uploadDir = path.join(__dirname, '../..', 'public', 'avatars');
      const fileName = `${userId}_avatar${path.extname(avatarFile.name).toLowerCase()}`;
      const uploadPath = path.join(uploadDir, fileName);

      // Vérifiez si le dossier de destination existe, sinon, créez-le
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Si un fichier avec le même userID existe, le supprimer
      // const existingFilePath = path.join(uploadDir, `${userId}_avatar.*`);
      const existingFiles = fs.readdirSync(uploadDir).filter(file => new RegExp(`${userId}_avatar.*`).test(file));
      
      existingFiles.forEach(existingFile => {
        fs.unlinkSync(path.join(uploadDir, existingFile));
      });

      // Déplacez le fichier téléchargé vers le dossier de destination
      avatarFile.mv(uploadPath, async (err) => {
        if (err) {
          console.error("Erreur lors de l'enregistrement du fichier :", err);
          res.status(500).json({ message: "Erreur lors de l'enregistrement du fichier." });
          return;
        }

        try {
          // Mise à jour du chemin de l'avatar dans la base de données
          await User.findByIdAndUpdate(userId, { $set: { avatar: `/avatars/${fileName}` } });
          res.status(200).json({ message: "Avatar téléchargé et enregistré avec succès." });
        } catch (updateError: any) {
          console.error("Erreur lors de la mise à jour de la base de données :", updateError);
          res.status(500).json({ message: "Erreur lors de la mise à jour de la base de données." });
        }
      });
    } catch (error: any) {
      console.error("Une erreur s'est produite lors du traitement de la demande :", error);
      res.status(500).json({ message: "Une erreur s'est produite lors du traitement de la demande." });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        res.status(400).json({ message: "User not found" });
        return;
      }
      await user.updateOne({ ...req.body });
      res.status(200).json({ message: "User updated successfully" });
    } catch (error: any) {
      res.status(500).json(error);
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        res.status(400).json({ message: "User not found" });
        return;
      }
      await user.deleteOne();
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error: any) {
      res.status(500).json(error);
    }
  }

  
}