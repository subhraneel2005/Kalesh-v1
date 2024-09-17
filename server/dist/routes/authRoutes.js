import { Router } from "express";
import { loginSchema, registerSchema } from "../validation/authValidation.js";
import { ZodError } from "zod";
import { formatError, renderEmailEJS } from "../helper.js";
import prisma from "../config/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid4 } from 'uuid';
import { emailQueue, emailQueueName } from "../jobs/emailjob.js";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/AuthMiddleware.js";
const router = Router();
//Login Route
router.post("/login", async (req, res) => {
    try {
        const body = req.body;
        const payload = loginSchema.parse(body);
        //checking email in database
        let user = await prisma.user.findUnique({
            where: {
                email: payload.email
            }
        });
        if (!user || user === null) {
            return res.status(422).json({ errors: {
                    email: "No user found with this email"
                } });
        }
        ;
        //check password from db
        const comparePassword = await bcrypt.compare(payload.password, user.password);
        if (!comparePassword) {
            return res.status(422).json({ errors: {
                    email: "Invalid Credentials"
                } });
        }
        ;
        //JWT Payload 
        let JWTPayload = {
            id: user.id,
            name: user.name,
            email: user.email
        };
        const token = jwt.sign(JWTPayload, process.env.SECRET_KEY, { expiresIn: "365d" });
        JWTPayload;
        return res.json({
            message: "Log in successfull",
            data: {
                ...JWTPayload,
                token: `Bearer ${token}`
            }
        });
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            return res.status(422).json({ message: "Invalid Data", errors });
        }
        return res.status(500).json({ message: "Internal Server Error. Please try again later" });
    }
});
//Login checking
router.post("/check/credentials", async (req, res) => {
    try {
        const body = req.body;
        const payload = loginSchema.parse(body);
        //checking email in database
        let user = await prisma.user.findUnique({
            where: {
                email: payload.email
            }
        });
        if (!user || user === null) {
            return res.status(422).json({ errors: {
                    email: "No user found with this email"
                } });
        }
        ;
        //check password from db
        const comparePassword = await bcrypt.compare(payload.password, user.password);
        if (!comparePassword) {
            return res.status(422).json({ errors: {
                    email: "Invalid Credentials"
                } });
        }
        ;
        return res.json({
            message: "Log in successfull",
            data: {}
        });
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            return res.status(422).json({ message: "Invalid Data", errors });
        }
        return res.status(500).json({ message: "Internal Server Error. Please try again later" });
    }
});
//Register route
router.post("/register", async (req, res) => {
    try {
        const body = req.body;
        const payload = registerSchema.parse(body);
        let user = await prisma.user.findUnique({
            where: { email: payload.email }
        });
        if (user) {
            return res.status(422).json({ message: "Email is already used by an user" });
        }
        ;
        //password encryption
        const salt = await bcrypt.genSalt(10);
        payload.password = await bcrypt.hash(payload.password, salt);
        const token = await bcrypt.hash(uuid4(), salt);
        const url = `${process.env.APP_URL}/verify-email?email=${payload.email}&token=${token}`;
        const emailBody = await renderEmailEJS("emails-verify", {
            name: payload.name,
            url: url
        });
        //Send email to user through Redis Queue
        await emailQueue.add(emailQueueName, { to: payload.email, subject: "Kalesh -v1 Email Verification", body: emailBody });
        await prisma.user.create({
            data: {
                name: payload.name,
                email: payload.email,
                password: payload.password,
                email_verify_token: token
            }
        });
        return res.json({ message: "Please check your email for verification " });
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            return res.status(422).json({ message: "Invalid Data", errors });
        }
        return res.status(500).json({ message: "Internal Server Error. Please try again later" });
    }
});
//Get User
router.get("/user", authMiddleware, async (req, res) => {
    const user = req.user;
    return res.json({ data: user });
});
export default router;
