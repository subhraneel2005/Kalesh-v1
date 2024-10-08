import { Router } from "express";
import { ZodError } from "zod";
import { formatError, imageValidator, removeImage, uploadImage } from "../helper.js";
import { kaleshSchema } from "../validation/kaleshVaidation.js";
import prisma from "../config/database.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
const router = Router();
router.get("/", authMiddleware, async (req, res) => {
    try {
        const kalesh = await prisma.kalesh.findMany({
            where: {
                user_id: req.user?.id
            },
            orderBy: {
                id: "desc"
            }
        });
        return res.json({
            message: "Your Kaleshes are fetched successfully",
            data: kalesh
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong. Try again later" });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const kalesh = await prisma.kalesh.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                KaleshItem: {
                    select: {
                        image: true,
                        id: true,
                        count: true
                    }
                },
                KaleshComments: {
                    select: {
                        id: true,
                        comment: true,
                        created_at: true
                    },
                    orderBy: {
                        id: "desc"
                    }
                }
            }
        });
        return res.json({
            message: "Kalesh is fetched successfully",
            data: kalesh
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong. Try again later" });
    }
});
router.post("/", authMiddleware, async (req, res) => {
    try {
        const body = req.body;
        const payload = kaleshSchema.parse(body);
        //check if files exists
        if (req.files?.image) {
            const image = req.files?.image;
            const validMsg = imageValidator(image.size, image.mimetype);
            if (validMsg) {
                return res.status(422).json({ errors: { image: validMsg } });
            }
            payload.image = await uploadImage(image);
        }
        else {
            return res
                .status(422)
                .json({ errors: { image: "Image field is required." } });
        }
        await prisma.kalesh.create({
            data: {
                ...payload,
                user_id: req.user?.id,
                expire_at: new Date(payload.expire_at),
                image: payload.image
            }
        });
        return res.json({ message: "Clash created successfully!" });
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            res.status(422).json({ message: "Invalid data", errors });
        }
        else {
            res
                .status(500)
                .json({ error: "Something went wrong.please try again!", data: error });
        }
    }
});
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const payload = kaleshSchema.parse(body);
        //check if files exists
        if (req.files?.image) {
            const image = req.files?.image;
            const validMsg = imageValidator(image.size, image.mimetype);
            if (validMsg) {
                return res.status(422).json({ errors: { image: validMsg } });
            }
            //get oldImage name
            const kalesh = await prisma.kalesh.findUnique({
                select: {
                    image: true,
                    id: true
                },
                where: {
                    id: Number(id)
                }
            });
            if (kalesh)
                removeImage(kalesh?.image);
            payload.image = await uploadImage(image);
        }
        await prisma.kalesh.update({
            where: {
                id: Number(id)
            },
            data: {
                ...payload,
                expire_at: new Date(payload.expire_at)
            }
        });
        return res.json({ message: "Kalesh updated successfully!" });
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            res.status(422).json({ message: "Invalid data", errors });
        }
        else {
            res
                .status(500)
                .json({ error: "Something went wrong.please try again!", data: error });
        }
    }
});
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        //get oldImage and delete
        const kalesh = await prisma.kalesh.findUnique({
            select: {
                image: true,
                id: true
            },
            where: {
                id: Number(id)
            }
        });
        if (kalesh)
            removeImage(kalesh?.image);
        await prisma.kalesh.delete({
            where: {
                id: Number(id)
            }
        });
        return res.json({ message: "Kalesh deleted successfully!", data: kalesh });
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            res.status(422).json({ message: "Invalid data", errors });
        }
        else {
            res
                .status(500)
                .json({ error: "Something went wrong.please try again!", data: error });
        }
    }
});
//kalesh item routes
router.post("/items", authMiddleware, async (req, res) => {
    const { id } = req.body;
    const files = req.files;
    let imgErrors = [];
    const images = files?.["images[]"];
    if (images.length >= 2) {
        //check validations
        images.map((img) => {
            const validMsg = imageValidator(img?.size, img?.mimetype);
            if (validMsg) {
                imgErrors.push(validMsg);
            }
        });
        if (imgErrors.length > 0) {
            return res.status(422).json({ errors: imgErrors });
        }
        //uplaoding imgaes to items
        let uploadedImgs = [];
        images.map((img) => {
            uploadedImgs.push(uploadImage(img));
        });
        uploadedImgs.map(async (item) => {
            await prisma.kaleshItem.create({
                data: {
                    image: item,
                    kalesh_id: Number(id)
                },
            });
        });
        return res.json({ message: "Kalesh Items added successfully 🎉" });
    }
    return res.status(422).json({ errors: ["Please select at least two images for Kaleshing."] });
});
export default router;
