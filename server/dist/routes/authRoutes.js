import { Router } from "express";
import { registerSchema } from "../validation/authValidation.js";
const router = Router();
//Register route
router.post("/", async (req, res) => {
    try {
        const body = req.body;
        const payload = registerSchema.parse(body);
        res.json(payload);
    }
    catch (error) {
        return res.status(404).json(error);
    }
});
export default router;
