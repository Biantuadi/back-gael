import { User } from "../../models/user.model";
import { Request, Response } from "express";
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
      const page = parseInt(req.query.page as string) || 1;
      const limit = 10;

      const skip = (page - 1) * limit;

      const users = await User.find().skip(skip).limit(limit);
      const totalCount = await User.countDocuments();

      const totalPages = Math.ceil(totalCount / limit);

      const usersWithoutPasswords = users.map((user) => {
        return { ...user.toObject(), password: undefined };
      });

      res.status(200).json({
        users: usersWithoutPasswords,
        totalUsers: totalCount,
        currentPage: page,
        totalPages,
      });
    } catch (error: any) {
      res.status(500).json(error);
    }
  }

  public async uploadAvatar(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req.body.user as { userID: string }).userID;

      if (!userId) {
        res
          .status(400)
          .json({ message: "Aucun ID d'utilisateur n'a été fourni." });
        return;
      }

      if (
        !req.files ||
        Object.keys(req.files).length === 0 ||
        !req.files.avatar
      ) {
        res
          .status(400)
          .json({ message: "Aucun fichier d'avatar n'a été téléchargé." });
        return;
      }

      const avatarFile = req.files.avatar as UploadedFile;

      // Convertir le fichier en base64
      const base64Data = avatarFile.data.toString("base64");
      const base64Avatar = `data:${avatarFile.mimetype};base64,${base64Data}`;

      // Mise à jour du chemin de l'avatar dans la base de données
      await User.findByIdAndUpdate(userId, { $set: { avatar: base64Avatar } });

      res
        .status(200)
        .json({
          message: "Avatar téléchargé et enregistré avec succès.",
          avatar: base64Avatar,
        });
    } catch (error: any) {
      console.error(
        "Une erreur s'est produite lors du traitement de la demande :",
        error
      );
      res
        .status(500)
        .json({
          message:
            "Une erreur s'est produite lors du traitement de la demande.",
        });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { userID } = req.body.user;
      const user = await User.findById(userID);

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      // Ne jamais mettre à jour le mot de passe directement depuis la requête
      const { password, ...userData }: any = req.body;

      await user.updateOne(userData);

      // Renvoi de l'utilisateur mis à jour sans le mot de passe
      const updatedUser = await User.findById(userID);

      if (!updatedUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const userWithoutPassword = {
        ...updatedUser.toObject(),
        password: undefined,
      };

      res
        .status(200)
        .json({
          message: "User updated successfully",
          user: userWithoutPassword,
        });
    } catch (error) {
      // Gestion des erreurs
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      if (!req.params.id) {
        res.status(400).json({ message: "User ID is required" });
        return;
      }

      if (!req.body.password) {
        res.status(400).json({ message: "Password is required" });
        return;
      }

      const user = await User.findById(req.params.id);
      const userPassword = req.body.password;

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const isPasswordValid = await user.comparePassword(userPassword);

      if (!isPasswordValid) {
        res.status(400).json({ message: "Invalid password" });
        return;
      }

      await user.deleteOne();

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error: any) {
      res.status(500).json(error);
    }
  }
}
