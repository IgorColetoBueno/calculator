"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const db_1 = require("../config/db");
const env_1 = require("../config/env");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = async (payload) => {
    const user = await db_1.prisma.user.findUnique({
        where: {
            username: payload.username,
        },
    });
    if (!user) {
        throw new Error("Invalid credentials");
    }
    const comparison = await bcrypt_1.default.compare(payload.password, user.password);
    if (!comparison) {
        throw new Error("Invalid credentials");
    }
    return jsonwebtoken_1.default.sign({ id: user.id }, env_1.JWT_SECRET);
};
exports.login = login;
