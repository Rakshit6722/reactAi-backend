import { z } from 'zod'

export const leadSchema = z.object({
    email: z.string().email("Enter a valid email"),
    firstName: z.string().min(1, "firstName should be more than one character"),
    lastName: z.string().min(1, "lastName should be more than one character"),
    company: z.string().min(1, "company name should be more than one character"),
})