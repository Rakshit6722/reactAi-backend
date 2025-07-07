import { z } from 'zod'

export const emailSentSchema = z.object({
    subject: z.string().optional(),
    body: z.string().optional(),
})