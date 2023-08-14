"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validation_1 = require("../config/validation");
const passport_1 = __importDefault(require("passport"));
const history_1 = require("../services/history");
const history_2 = require("../validation/history");
const historyRoutes = express_1.default.Router();
historyRoutes.post("/new", passport_1.default.authenticate("bearer", { session: false }), (0, validation_1.validationMiddleware)(history_2.historySchema), async (req, res) => {
    try {
        const user = (0, history_1.createHistory)({
            ...req.body,
            userId: req.user.id,
        });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: "Error on history creation" });
    }
});
historyRoutes.delete("/clear", passport_1.default.authenticate("bearer", { session: false }), async (req, res) => {
    try {
        (0, history_1.clearHistory)(req.user.id);
        res.status(200).json({});
    }
    catch (error) {
        res.status(500).json({ error: "Error on history clear" });
    }
});
historyRoutes.get("/", passport_1.default.authenticate("bearer", { session: false }), async (req, res) => {
    try {
        const history = await (0, history_1.getHistory)(req.user.id);
        res.status(200).json(history);
    }
    catch (error) {
        res.status(500).json({ error: "Error on history list" });
    }
});
exports.default = historyRoutes;
