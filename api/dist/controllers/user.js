"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validation_1 = require("../config/validation");
const user_1 = require("../services/user");
const user_2 = require("../validation/user");
const passport_1 = __importDefault(require("passport"));
const userRoutes = express_1.default.Router();
userRoutes.post("/register", (0, validation_1.validationMiddleware)(user_2.userRegisterSchema), async (req, res) => {
    try {
        const payload = req.body;
        const user = (0, user_1.createUser)({
            ...payload,
        });
        res.json(user);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
userRoutes.delete("/delete", passport_1.default.authenticate("bearer", { session: false }), async (req, res) => {
    try {
        const payload = req.user.id;
        console.log(payload);
        (0, user_1.removeUser)(+payload);
        res.status(200).json({});
    }
    catch (error) {
        res.status(500).json({ error: "Error on user delete" });
    }
});
userRoutes.get("/me", passport_1.default.authenticate("bearer", { session: false }), async (req, res) => {
    try {
        res.json(req.user);
    }
    catch (error) {
        res.status(500).json({ error: "Error getting the user" });
    }
});
exports.default = userRoutes;
