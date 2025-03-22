import { dbConnection } from "./config/dbConnection.js";
import { userRoutes } from "./routes/user.routes.js";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Your Server Is Runing On ${PORT}`);
});
dbConnection();
