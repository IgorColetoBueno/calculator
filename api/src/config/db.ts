import { PrismaClient } from '@prisma/client';

class PrismaSingleton {
  private static instance: PrismaSingleton;
  prisma: PrismaClient;

  private constructor() {
    this.prisma = new PrismaClient();
  }

  static getInstance(): PrismaSingleton {
    if (!PrismaSingleton.instance) {
      PrismaSingleton.instance = new PrismaSingleton();
    }
    return PrismaSingleton.instance;
  }
}

export const prisma = PrismaSingleton.getInstance().prisma

export default PrismaSingleton;
