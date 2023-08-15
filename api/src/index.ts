import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import AuthConfig from "./config/auth";
import authRoutes from "./controllers/auth";
import userRoutes from "./controllers/user";
import historyRoutes from "./controllers/history";
import cors, { CorsOptions } from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(passport.initialize());
AuthConfig.config();

const whitelist = ["http://localhost:3000"];

const corsOptions = {
  origin: function (origin: string, callback: any) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Use the cors middleware with configured options
app.use(cors(corsOptions as CorsOptions));

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
