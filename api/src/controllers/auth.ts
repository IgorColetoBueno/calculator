import express from "express";
import { validationMiddleware } from "../config/validation";
import { login } from "../services/auth";
import { userRegisterSchema } from "../validation/user";

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
    } catch (error: any) {
      if ((error.message = "Invalid credentials")) {
        return res.status(401).json({ error });
      }
      res.status(50).json({ error });
    }
  }
);

export default authRoutes;
