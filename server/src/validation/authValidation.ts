import {z} from 'zod';

export const registerSchema = z.object({
    name: z.string({message: "Name is required"})
    .min(3, {message: "Name must be 3 chararcters long"}),
    email: z.string({message: "Email is required"})
    .email({message: "Please type a valid email😠"}),
    password: z.string({message: "Pasword is required"})
    .min(6, {message: "Password must be 6 chararcters long"}),
    conform_password: z.string({message: "Conform the Pasword!😠"})
    .min(6, {message: "Conform Password must be 6 chararcters long"}),
})
.refine((data) => data.password  === data.conform_password, {
    message: "Conform password didnt matched", path:["conform_password"]
} )