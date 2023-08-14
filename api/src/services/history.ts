import { History } from "@prisma/client";
import { prisma } from "../config/db";

export const createHistory = async (payload: Omit<History, 'id'>) => {
  try {
    const history = await prisma.history.create({
      data: payload,
    });

    return history;
  } catch (error) {
    throw error;
  }
};

export const getHistory = async (userId: number) => {
  try {
    return await prisma.history.findMany({
      where: { userId },
    });
  } catch (error) {
    throw new Error("Error retrieving history");
  }
};

export const clearHistory = async (userId: number) => {
  try {
    return await prisma.history.deleteMany({
      where: { userId },
    });
  } catch (error) {
    throw new Error("Error retrieving history");
  }
};
