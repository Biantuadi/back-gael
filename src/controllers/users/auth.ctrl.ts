import { User } from "../../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import config from "../../config/env.config";
import { io } from "../../app";

const JWT_SECRET = config.jwtSecret as string;
const TOKEN_EXPIRATION = config.tokenExpiration as string;

export default class AuthController {
  private static readonly SALT_ROUNDS = 10;

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      // regex pour vérifier que l'email est bien un email
      const { email, password } = req.body;

      const transformedEmail = email.toLowerCase();

      const emailRegex = new RegExp(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
      );

      if (!emailRegex.test(transformedEmail)) {
        res.status(400).json({ message: "Invalid email" });
        return;
      }

      const user = await User.findOne({ email: transformedEmail });
      
      if (!user) {
        res.status(400).json({ message: "User not found" });
        return;
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        res.status(400).json({ message: "Invalid credentials" });
        return;
      }

      const token = jwt.sign({ userID: user._id, role: user.role }, JWT_SECRET, {
        expiresIn: TOKEN_EXPIRATION,
      });

      // send back the all user info (except password) and the token
      const userToSend = {
        ...user.toObject(),
        password: undefined,
      };
      
      res.status(200).json({ user: userToSend, token });
    } catch (error: any) {
      console.error("An error occurred while processing the request:", error);
      res
        .status(500)
        .json({ message: "An error occurred while processing the request" });
    }
  }

  public async signup(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      const { firstname, lastname, email, password } = req.body;

      const transformedEmail = email.toLowerCase();

      const emailRegex = new RegExp(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
      );

      if (!emailRegex.test(transformedEmail)) {
        res.status(400).json({ message: "Invalid email" });
        return;
      }

      const user = await User.findOne({ transformedEmail });
      if (user) {
        res.status(400).json({ message: "User already exists" });
        return;
      }
      const hashedPassword = await bcrypt.hash(
        password,
        AuthController.SALT_ROUNDS
      );
      const newUser = new User({
        firstname,
        lastname,
        email: transformedEmail,
        password: hashedPassword,
        createdAt: new Date(),
      });

      const savedUser = await newUser.save();

      const token = jwt.sign({ userID: savedUser._id , role: savedUser.role}, JWT_SECRET, {
        expiresIn: TOKEN_EXPIRATION,
      });

      // send back the all user info (except password) and the token
      const userToSend = {
        ...savedUser.toObject(),
        password: undefined,
      };

      const socketId = (req as any).socket.id;

      // Envoyez un événement de connexion réussie au client
      io.to(socketId).emit('loginSuccess', { userId: savedUser._id  });

      res.status(200).json({ user: userToSend, token });

    } catch (error: any) {
      console.error("An error occurred while processing the request:", error);
      res
        .status(500)
        .json({ message: "An error occurred while processing the request" });
    }
  }

  public async updateUserPassword(req: Request, res: Response): Promise<void> {
    try {
      const userID = (req.body.user as { userID: string }).userID;
      const { oldPassword, newPassword } = req.body;

      const user = await User.findById(userID);

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const passwordMatch = await bcrypt.compare(oldPassword, user.password);
      if (!passwordMatch) {
        res.status(400).json({ message: "Invalid old password" });
        return;
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, AuthController.SALT_ROUNDS);
      user.password = hashedNewPassword;
      await user.save();

      res.status(200).json({ message: "Password updated successfully" });
    } catch (error: any) {
      console.error("An error occurred while updating password:", error);
      res.status(500).json({ message: "An error occurred while updating password" });
    }
  }

  public async deleteAll(req: Request, res: Response): Promise<void> {
    try {
      await User.deleteMany({});
      res.status(200).json({ message: "All users have been deleted" });
    } catch (error: any) {
      res.status(500).json(error);
    }
  }
  
}