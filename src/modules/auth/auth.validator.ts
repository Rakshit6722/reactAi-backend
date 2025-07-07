import {z} from 'zod'

export const loginSchema = z.object({
        email: z.string().email("Enter a valid email"),
        password: z.string()
})

export const signUpSchema = z.object({
        name: z.string().min(1,"name must be greater than 1 character"),
        email: z.string().email("Enter a valid email"),
        password: z.string().min(6,"password must be atleast 6 character long")
})

export type loginFormData = z.infer<typeof loginSchema>
export type signupFormData = z.infer<typeof signUpSchema>