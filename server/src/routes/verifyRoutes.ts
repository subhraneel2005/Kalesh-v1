import { Router, Request, Response } from 'express';
import prisma from '../config/database.js';

const router = Router();

router.get('/verify-email', async(req:Request, res:Response) => {
    const {email,token} = req.query;

    if(email && token){
        const user = await prisma.user.findUnique({
            where: {
                email: email as string
            }
        })

        if(user){
            if(token === user.email_verify_token){
                //frontpage redirect
                await prisma.user.update({
                    data:{
                        email_verify_token: null,
                        email_verified_at: new Date().toISOString()
                    },
                    where:{
                        email: email as string
                    }
                })

                return res.redirect(`${process.env.CLIENT_APP_URL}/login`);
            }
        }
        return res.redirect("/verify-error");
    }
    return res.redirect("/verify-error");
})

router.get('/verify-error' ,async(req:Request, res:Response) => {
    return res.render('auth/emailVerifyError')
})

export default router;