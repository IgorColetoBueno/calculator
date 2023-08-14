"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearHistory = exports.getHistory = exports.createHistory = void 0;
const db_1 = require("../config/db");
const createHistory = async (payload) => {
    try {
        const history = await db_1.prisma.history.create({
            data: payload,
        });
        return history;
    }
    catch (error) {
        throw error;
    }
};
exports.createHistory = createHistory;
const getHistory = async (userId) => {
    try {
        return await db_1.prisma.history.findMany({
            where: { userId },
        });
    }
    catch (error) {
        throw new Error("Error retrieving history");
    }
};
exports.getHistory = getHistory;
const clearHistory = async (userId) => {
    try {
        return await db_1.prisma.history.deleteMany({
            where: { userId },
        });
    }
    catch (error) {
        throw new Error("Error retrieving history");
    }
};
exports.clearHistory = clearHistory;
