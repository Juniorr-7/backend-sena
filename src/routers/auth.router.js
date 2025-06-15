import { Router } from "express";
import { login, logout } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/jsonwebtoken.middleware.js";

const router = Router();

router.post("/login", login);
router.post("/logout", verifyToken, logout);

export default { prefix: "/auth", router };