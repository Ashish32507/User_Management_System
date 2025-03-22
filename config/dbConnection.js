import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.log("Database Connection Filed");
    });
};
