import { z } from 'zod'

export const campaignSchema = z.object({
    name: z.string().min(1, "Campaign name is required"),
    subject: z.string().min(1, "Subject is required"),
    body: z.string().min(1, "Body is required"),
});
export const campaignNameSchema = z.object({
    name: z.string().min(1, "Campaign name is required"),
});
export const campaignBodySchema = z.object({
    body: z.string().min(1, "Body is required"),
});
export const campaignSubjectSchema = z.object({
    subject: z.string().min(1, "Subject is required"),
});