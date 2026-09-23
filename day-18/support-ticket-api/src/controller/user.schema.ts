import z from 'zod'

export const signUpSchema = z.object({
    name: z.string().min(3),
    email: z.string().endsWith('@gmail.com'),
    role: z.enum(["USER", "AGENT", "ADMIN"]),
    password: z.string()
})

export const loginSchema = z.object({
    email: z.string().endsWith('@gmail.com'),
    role: z.enum(['USER', 'AGENT', 'ADMIN']),
    password: z.string()
})