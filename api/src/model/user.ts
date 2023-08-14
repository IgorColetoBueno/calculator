import { Prisma } from "@prisma/client";

const userPublicData = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    username: true,
    id: true,
    history: true,
  },
});

const userRegister = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    username: true,
    password: true
  },
});

export type UserPublicData = Prisma.UserGetPayload<typeof userPublicData>;
export type UserRegister = Prisma.UserGetPayload<typeof userRegister>;
