"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.removeUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../config/db");
const env_1 = require("../config/env");
const createUser = async (payload) => {
    try {
        const hashedPassword = await bcrypt_1.default.hash(payload.password, env_1.JWT_SALT);
        const user = await db_1.prisma.user.create({
            data: {
                ...payload,
                password: hashedPassword,
            },
            select: {
                username: true,
            },
        });
        return user;
    }
    catch (error) {
        throw new Error("Error creating user");
    }
};
exports.createUser = createUser;
const removeUser = async (id) => {
    try {
        await db_1.prisma.history.deleteMany({
            where: { userId: id },
        });
        await db_1.prisma.user.delete({
            where: { id },
        });
    }
    catch (error) {
        throw new Error("Error removing user");
    }
};
exports.removeUser = removeUser;
const getUser = async (id) => {
    try {
        console.log(id);
        return await db_1.prisma.user.findUnique({
            where: { id },
            select: {
                username: true,
            },
        });
    }
    catch (error) {
        throw new Error("Error removing user");
    }
};
exports.getUser = getUser;
