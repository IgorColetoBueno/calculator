import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import AuthConfig from "./config/auth";
import authRoutes from "./controllers/auth";
import userRoutes from "./controllers/user";
import historyRoutes from "./controllers/history";

dotenv.config();

const app = express();
app.use(express.json());
app.use(passport.initialize());
AuthConfig.config()

const port = process.env.API_PORT;

app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/history", historyRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to Calculator");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
