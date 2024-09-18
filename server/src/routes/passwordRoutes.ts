import {Router, Request, Response} from "express";
import prisma from "../config/database.js";
import { authLimiter } from "../config/rate-limit.js";
import { ZodError } from "zod";
import { checkDateHourDiff, formatError, renderEmailEJS } from "../helper.js";
import { forgetPasswordSchema, resetPasswordSchema } from "../validation/passwordValidation.js";
import bcrypt from "bcrypt";
import {v4 as uuidV4} from "uuid";
import { emailQueue, emailQueueName } from "../jobs/emailjob.js";

const router = Router();

//forget password
router.post("/forget-password", authLimiter, async (req:Request, res:Response) => {
    try {
        const body = req.body;
        const payload = forgetPasswordSchema.parse(body);

        let user = await prisma.user.findUnique({
            where: { email: payload.email }
        })

        if(!user || user === null){
            return res.status(422).json({ message: "Invaild Data" ,errors:{
                email:"No user found with this email"
            } })
        }

        const salt = await bcrypt.genSalt(10);
        const token = await bcrypt.hash(uuidV4(), salt);
        await prisma.user.update({
            data:{
                password_reset_token: token,
                token_send_at: new Date().toISOString()
            },
            where: { email: payload.email },
        })

        const url = `${process.env.CLIENT_APP_URL}/reset-password?email=${payload.email}&token=${token}`;

        const html = await renderEmailEJS("forget-password", {url: url});

        await emailQueue.add(emailQueueName,{
            to: payload.email,
            subject: "Reset your password [Kalesh -v1]",
            body: html
        })

        return res.json({message: "Password reset link sent to your email. Please check."})

    } catch (error) {
        if(error instanceof ZodError){
            const errors = formatError(error)
            return res.status(422).json({message: "Invalid Data", errors});
        }
        return res.status(500).json({message: "Internal Server Error. Please try again later"});
    }
})

//reset password
router.post("/reset-password", async(req:Request, res: Response) => {
    try {
       const body = req.body
       const payload = resetPasswordSchema.parse(body) 

       let user = await prisma.user.findUnique({
        where: { email: payload.email }
    })

    if(!user || user === null){
        return res.status(422).json({ message: "Invaild Data" ,errors:{
            email:"Link is not correct. Make sure you copied the correct link"
        } })
    }

    //check token 
    if(user.password_reset_token !==  payload.token){
        return res.status(422).json({ 
            message: "Invaild Data" ,
            errors:{
                email:"Link is not correct. Make sure you copied the correct link",
            },
        });
    }

    //check 2 hours duration 
    const hoursDiff = checkDateHourDiff(user.token_send_at!);

    if(hoursDiff > 2){
        return res.status(422).json({ 
            message: "Invaild Data" ,
            errors:{
                email:"Password reset token got expired. Send new token",
            },
        });
    }

    //updating the password now
    const salt = await bcrypt.genSalt(10);
    const newPass = await bcrypt.hash(payload.password, salt);
    await prisma.user.update({
       data:{
        password: newPass,
        password_reset_token: null,
        token_send_at: null
       },
       where:{email: payload.email} 
    })

    return res.json({
        message: "Password reset successfully. Please try to login now"
    })
    } catch (error) {
        if(error instanceof ZodError){
            const errors = formatError(error)
            return res.status(422).json({message: "Invalid Data", errors});
        }
        return res.status(500).json({message: "Internal Server Error. Please try again later"});
    }
})

export default router;