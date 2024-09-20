import { Router,Request,Response } from "express";
import { ZodError } from "zod";
import { formatError, imageValidator, uploadImage } from "../helper.js";
import { kaleshSchema } from "../validation/kaleshVaidation.js";
import { UploadedFile } from "express-fileupload";
import prisma from "../config/database.js";
import authMiddleware from "../middleware/AuthMiddleware.js";

const router = Router();

router.post("/",authMiddleware, async(req:Request, res:Response) => {
    try {
        const body = req.body;
        const payload = kaleshSchema.parse(body);

        //check if files exists
        if(req.files?.image){
            const image = req.files?.image as UploadedFile;
            const validMsg = imageValidator(image.size, image.mimetype);

            if(validMsg){
                return res.status(422).json({ errors: { image: validMsg } });
            }

            payload.image = await uploadImage(image);
        }
        else{
            return res
            .status(422)
            .json({ errors: { image: "Image field is required." } });
        }

       await prisma.kalesh.create({
        data:{
            ...payload,
            user_id: req.user?.id!,
            expire_at: new Date(payload.expire_at),
            image: payload.image!
        }
       });

    return res.json({ message: "Clash created successfully!" });

    } catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            res.status(422).json({ message: "Invalid data", errors });
          } else {
            
            res
              .status(500)
              .json({ error: "Something went wrong.please try again!", data: error });
          }
    }
})

export default router;