import { Router } from "express";
import AuthRoutes from "./authRoutes.js"
import VerifyRoutes from "./verifyRoutes.js"
import PasswordRoutes from "./passwordRoutes.js"
import KaleshRoutes from "./clashRoutes.js"
import authMiddleware from "../middleware/AuthMiddleware.js";

const router = Router();

router.use("/api/auth", AuthRoutes)
router.use("/api/auth", PasswordRoutes)
router.use("/", VerifyRoutes)
router.use("/api/kalesh", KaleshRoutes)

export default router;