import express from "express";
import { validationMiddleware } from "../config/validation";
import { UserPublicData, UserRegister } from "../model/user";
import { createUser, getUser, removeUser } from "../services/user";
import { userRegisterSchema } from "../validation/user";
import passport from "passport";

const userRoutes = express.Router();

userRoutes.post(
  "/register",
  validationMiddleware(userRegisterSchema),
  async (req, res) => {
    try {
      const payload: UserRegister = req.body;

      const user = createUser({
        ...payload,
      });

      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

userRoutes.delete(
  "/delete",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    try {
      const payload = (req.user as UserPublicData).id

      console.log(payload)
      removeUser(+payload);

      res.status(200).json({});
    } catch (error) {
      res.status(500).json({ error: "Error on user delete" });
    }
  }
);

userRoutes.get(
  "/me",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    try {
      res.json(req.user);
    } catch (error) {
      res.status(500).json({ error: "Error getting the user" });
    }
  }
);

export default userRoutes;
