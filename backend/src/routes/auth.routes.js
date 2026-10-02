import { Router } from "express";
import {
  login,
  logout,
  profile,
  register,
} from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const authRouter = Router();

// loguearse
authRouter.post("/login", login);

// registrarse
authRouter.post("/register", register);

// ver perfil del logueado
authRouter.get("/profile", authMiddleware, profile);

// desloguearse;
authRouter.post("/logout", logout);
