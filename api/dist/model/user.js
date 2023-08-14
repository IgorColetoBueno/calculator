"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const userPublicData = client_1.Prisma.validator()({
    select: {
        username: true,
        id: true,
        history: true,
    },
});
const userRegister = client_1.Prisma.validator()({
    select: {
        username: true,
        password: true
    },
});
