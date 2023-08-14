import passport from "passport";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import { prisma } from "../config/db";
import { UserPublicData } from "../model/user";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./env";

export default class AuthConfig {
  static config() {
    passport.use(
      new BearerStrategy(async (token: any, done) => {
        try {
          const verified = jwt.verify(token, JWT_SECRET);

          if (!verified) {
            return done(null, false);
          }

          const { id }: any = jwt.decode(token);

          const user: UserPublicData | null = await prisma.user.findUnique({
            where: { id: +id } as any,
            select: {
              username: true,
              id: true,
              history: true,
            },
          });

          if (!user) {
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      })
    );
  }
}
