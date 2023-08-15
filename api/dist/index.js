"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const auth_1 = __importDefault(require("./config/auth"));
const auth_2 = __importDefault(require("./controllers/auth"));
const user_1 = __importDefault(require("./controllers/user"));
const history_1 = __importDefault(require("./controllers/history"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
auth_1.default.config();
const whitelist = ["http://localhost:3000"];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};
// Use the cors middleware with configured options
app.use((0, cors_1.default)(corsOptions));
const port = process.env.API_PORT;
app.use("/user", user_1.default);
app.use("/auth", auth_2.default);
app.use("/history", history_1.default);
app.get("/", (req, res) => {
    res.send("Welcome to Calculator");
});
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
