import express from "express";
import { login } from "../services/auth";
import { validationMiddleware } from "../config/validation";
import { userRegisterSchema } from "../validation/user";
import { prisma } from "../config/db";

const authRoutes = express.Router();

authRoutes.post(
  "/login",
  validationMiddleware(userRegisterSchema),
  async (req, res) => {
    try {
      const token = await login(req.body);

      return res.status(200).json({
        token,
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
);

export default authRoutes;
