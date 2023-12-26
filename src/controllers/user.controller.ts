import { User } from "../models/user.model";
import { Request, Response } from "express";

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