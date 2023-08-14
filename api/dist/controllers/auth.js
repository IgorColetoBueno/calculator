"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../services/auth");
const validation_1 = require("../config/validation");
const user_1 = require("../validation/user");
const authRoutes = express_1.default.Router();
authRoutes.post("/login", (0, validation_1.validationMiddleware)(user_1.userRegisterSchema), async (req, res) => {
    try {
        const token = await (0, auth_1.login)(req.body);
        return res.status(200).json({
            token,
        });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.default = authRoutes;
