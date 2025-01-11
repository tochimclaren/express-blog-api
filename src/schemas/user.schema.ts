import { z } from "zod";


export const userLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

export const userRegistrationSchema = z.object({
    email: z.string(),
    username: z.string(),
    authentication: z.object({
        password: z.string(),
        salt: z.string().optional(),
        sessionToken: z.string().optional(),
    }),
    created: z.date().optional(),
    updated: z.date().optional(),
    isAdmin: z.boolean().optional(),
})

export const updateUserSchema = z.object({
    email: z.string().email().optional(),
    username: z.string().optional(),
    isAdmin: z.boolean().optional()
})

export const changePasswordSchema = z.object({
    email: z.string().email(),
    oldPassword: z.string().min(8),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

