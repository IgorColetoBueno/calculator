"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_http_bearer_1 = require("passport-http-bearer");
const db_1 = require("../config/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("./env");
class AuthConfig {
    static config() {
        passport_1.default.use(new passport_http_bearer_1.Strategy(async (token, done) => {
            try {
                const verified = jsonwebtoken_1.default.verify(token, env_1.JWT_SECRET);
                if (!verified) {
                    return done(null, false);
                }
                const { id } = jsonwebtoken_1.default.decode(token);
                const user = await db_1.prisma.user.findUnique({
                    where: { id: +id },
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
            }
            catch (error) {
                return done(error);
            }
        }));
    }
}
exports.default = AuthConfig;
