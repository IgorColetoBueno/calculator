"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
class PrismaSingleton {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    static getInstance() {
        if (!PrismaSingleton.instance) {
            PrismaSingleton.instance = new PrismaSingleton();
        }
        return PrismaSingleton.instance;
    }
}
exports.prisma = PrismaSingleton.getInstance().prisma;
exports.default = PrismaSingleton;
