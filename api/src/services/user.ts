import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { prisma } from "../config/db";
import { JWT_SALT } from "../config/env";

export const createUser = async (payload: Omit<User, "id">) => {
  try {
    const hashedPassword = await bcrypt.hash(payload.password, JWT_SALT);

    const user = await prisma.user.create({
      data: {
        ...payload,
        password: hashedPassword,
      },
      select: {
        username: true,
      },
    });

    return user;
  } catch (error) {
    throw new Error("Error creating user");
  }
};

export const removeUser = async (id: number) => {
  try {
    await prisma.history.deleteMany({
      where: { userId: id },
    });
    await prisma.user.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error("Error removing user");
  }
};

export const getUser = async (id: number) => {
  try {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        username: true,
      },
    });
  } catch (error) {
    throw new Error("Error removing user");
  }
};
