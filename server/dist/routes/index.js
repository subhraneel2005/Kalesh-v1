import { Router } from "express";
import AuthRoutes from "./authRoutes.js";
import VerifyRoutes from "./verifyRoutes.js";
const router = Router();
router.use("/api/auth", AuthRoutes);
router.use("/", VerifyRoutes);
export default router;
