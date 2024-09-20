import {z} from 'zod';

export const kaleshSchema = z.object({
    
  title: z
    .string({ message: "Title is required" })
    .min(2, { message: "Title must be 2 characters long" })
    .max(60, { message: "Length must be below 60 characters" }),
    decsription: z
    .string({message: "Description is required" })
    .max(500, { message: "Lenght must be below 500 characters" }),
    expire_at: z
    .string({ message: "Expire at is required." })
    .min(5, { message: "Please pass correct date" }),
    image: z.string().optional(),
})