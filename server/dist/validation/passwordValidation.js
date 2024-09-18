import { z } from "zod";
export const forgetPasswordSchema = z.object({
    email: z.string({ message: "Email is required" }).email({ message: "Email is not valid" })
});
export const resetPasswordSchema = z.object({
    email: z.string({ message: "Email is required" }).email({ message: "Email is not valid" }),
    token: z.string({ message: "Token is required" }),
    password: z.string({ message: "Pasword is required" })
        .min(6, { message: "Password must be 6 chararcters long" }),
    conform_password: z.string({ message: "Conform the Pasword!😠" })
        .min(6, { message: "Conform Password must be 6 chararcters long" }),
})
    .refine((data) => data.password === data.conform_password, {
    message: "Conform password didnt matched", path: ["conform_password"]
});
