import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import AppError from "../../utils/AppError";
import { SEND_EMAIL_RESPONSE } from "../../constants/sendEmail.constant";
import { emailQueue } from "../../services/emailQueue";

const prisma = new PrismaClient()

const { ERROR } = SEND_EMAIL_RESPONSE

export const sendEmailService = async (req: Request) => {
    try {
        const { campaignId, emailSentId } = req.params

        if (!campaignId || !emailSentId) {
            throw new AppError(ERROR.ID_NOT_FOUND.message, ERROR.ID_NOT_FOUND.status)
        }

        const leads = await prisma.lead.findMany({
            where: {
                campaignId: Number(campaignId),
                shouldSend: true
            }
        })



        //find user in order to get useraccesstoken for send mail through google api
        const campaign = await prisma.campaign.findUnique({
            where: {
                id: Number(campaignId)
            },
            include: {
                user: true
            }
        })

        const userName = campaign!.user.name
        const userAccessToken = campaign!.user.googleAccessToken
        const userEmail = campaign!.user.email
        const userRefreshToken = campaign!.user.googleRefreshToken

        if (!leads) {
            throw new AppError(ERROR.LEAD_NOT_FOUND.message, ERROR.LEAD_NOT_FOUND.status)
        }

        const emailSent = await prisma.emailSent.findUnique({
            where: {
                id: Number(emailSentId)
            },
            include: {
                campaignAttachments: true
            }
        })

        if (!emailSent) {
            throw new AppError(ERROR.EMAIL_NOT_FOUND.message, ERROR.EMAIL_NOT_FOUND.status)
        }

        for (const lead of leads) {
            console.log(`📨 Adding email job to queue for lead: ${lead.email}`)
            await emailQueue.add("send-to-lead", {
                lead,
                emailSent,
                userName,
                userEmail,
                userRefreshToken
            })
        }

        console.log(`✅ Added ${leads.length} email jobs to the queue`)

    } catch (err: any) {
        throw err
    }
}