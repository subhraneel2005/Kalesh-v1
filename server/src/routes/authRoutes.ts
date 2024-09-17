import {Router,Request, Response} from "express"
import { registerSchema } from "../validation/authValidation.js";
import { ZodError } from "zod";
import { formatError, renderEmailEJS } from "../helper.js";
import prisma from "../config/database.js";
import bcrypt from "bcrypt"
import {v4 as uuid4} from 'uuid'
import { name } from "ejs";
import { emailQueue, emailQueueName } from "../jobs/emailjob.js";
const router = Router()


//Register route
router.post("/register", async(req:Request, res: Response) => {
    try {
        const body = req.body;
        const payload = registerSchema.parse(body);

        let user = await prisma.user.findUnique({
            where: {email: payload.email}
        })
        if(user){
            return res.status(422).json({message: "Email is already used by an user"})
        };

        //password encryption
        const salt = await bcrypt.genSalt(10);
        payload.password = await bcrypt.hash(payload.password, salt);

        const token = await bcrypt.hash(uuid4(), salt);
        const url = `${process.env.APP_URL}/verify-email?email=${payload.email}&token=${token}`

        const emailBody = await renderEmailEJS("emails-verify", {
            name: payload.name,
            url:url
        })

        //Send email to user through Redis Queue
        await emailQueue.add(emailQueueName, {to: payload.email, subject:"Kalesh -v1 Email Verification", body: emailBody})


        await prisma.user.create({
            data:{
                name: payload.name,
                email: payload.email,
                password: payload.password,
                email_verify_token: token
            }
        })

        return res.json({message: "Please check your email for verification "});

    } catch (error) {
        console.log("The error is", error);
        
        if(error instanceof ZodError){
            const errors = formatError(error)
            return res.status(422).json({message: "Invalid Data", errors});
        }
        return res.status(500).json({message: "Internal Server Error. Please try again later"});
    }
})

export default router;