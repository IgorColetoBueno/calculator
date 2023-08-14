import express from "express";
import { validationMiddleware } from "../config/validation";
import { UserPublicData, UserRegister } from "../model/user";
import { createUser, getUser, removeUser } from "../services/user";
import { userRegisterSchema } from "../validation/user";
import passport from "passport";
import { clearHistory, createHistory, getHistory } from "../services/history";
import { History } from "@prisma/client";
import { historySchema } from "../validation/history";

const historyRoutes = express.Router();

historyRoutes.post(
  "/new",
  passport.authenticate("bearer", { session: false }),
  validationMiddleware(historySchema),
  async (req, res) => {
    try {
      const user = createHistory({
        ...req.body,
        userId: (req.user as UserPublicData).id,
      } as History);

      res.json(user);
    } catch (error) {
      res.status(500).json({error: "Error on history creation"});
    }
  }
);

historyRoutes.delete(
  "/clear",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    try {
      clearHistory((req.user as UserPublicData).id);

      res.status(200).json({});
    } catch (error) {
      res.status(500).json({ error: "Error on history clear" });
    }
  }
);

historyRoutes.get(
  "/",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    try {
      const history = await getHistory((req.user as UserPublicData).id);
      res.status(200).json(history);
    } catch (error) {
      res.status(500).json({ error: "Error on history list" });
    }
  }
);

export default historyRoutes;
