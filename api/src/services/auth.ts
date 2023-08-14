import { prisma } from "../config/db";
import { JWT_SALT, JWT_SECRET } from "../config/env";
import { UserRegister } from "../model/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (payload: UserRegister) => {
  const user = await prisma.user.findUnique({
    where: {
      username: payload.username,
    },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const comparison = await bcrypt.compare(payload.password, user.password);

  if (!comparison) {
    throw new Error("Invalid credentials");
  }

  return jwt.sign({ id: user.id }, JWT_SECRET);
};
