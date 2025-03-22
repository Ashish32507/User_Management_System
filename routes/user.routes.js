import express from "express";
import {
  addUser,
  loginUser,
  userProfile,
  updateProfile,
  deleteProfile,
} from "../controller/user.controller.js";
import { isAuthenticate } from "../middleware/middleware.js";
const routes = express.Router();
routes.post("/register", addUser);
routes.post("/login", loginUser);
routes.get("/profile", isAuthenticate, userProfile);
routes.put("/profile", isAuthenticate, updateProfile);
routes.delete("/profile", isAuthenticate, deleteProfile);
export const userRoutes = routes;
