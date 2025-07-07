import { PrismaClient } from "@prisma/client"
import { Request } from "express"
import AppError from "../../utils/AppError"
import { EMAIL_RESPONSES } from "../../constants/emailSent.constant"
import { CAMPAIGN_RESPONSE } from "../../constants/campaign.constant"

const prisma = new PrismaClient()

const { ERROR } = EMAIL_RESPONSES

export const createEmailSentService = async (req: Request) => {
    try {
        const { campaignId } = req.params

        let subject: string = ''
        let body: string = ''

        if (!campaignId) {
            throw new AppError(ERROR.CAMPAIGN_ID_NOT_FOUND.message, ERROR.CAMPAIGN_ID_NOT_FOUND.status)
        }

        if (req.body.subject) {
            subject = req.body.subject
        }
        if (req.body.body) {
            body = req.body.body
        }

        if (!subject || !body) {
            const campaign = await prisma.campaign.findUnique({
                where: {
                    id: Number(campaignId)
                }
            })


            if (campaign) {
                if (!subject) {
                    subject = campaign!.subject
                }

                if (!body) {
                    body = campaign!.body
                }

            } else {
                throw new AppError(CAMPAIGN_RESPONSE.ERRORS.CAMPAIGN_NOT_FOUND.message, CAMPAIGN_RESPONSE.ERRORS.CAMPAIGN_NOT_FOUND.status)
            }
        }

        const emailSent = await prisma.emailSent.create({
            data: {
                campaignId: Number(campaignId),
                subject,
                body,
            }
        })

        const leads = await prisma.campaign.findUnique({
            where: {
                id: Number(campaignId)
            },
            include: {
                leads: true
            }
        })

        const validLeads = leads!.leads.filter((lead) => lead.shouldSend)


        const emailLeadMap = validLeads.map(async (lead) => (
            await prisma.leadEmailStatus.create({
                data: {
                    leadId: Number(lead.id),
                    emailSentId: Number(emailSent.id)
                }
            })
        ))

        if (!emailLeadMap) {
            console.log("error in leademailstatus junction table")
            throw new AppError(ERROR.EMAILSENT_NOT_CREATED.message, ERROR.EMAILSENT_NOT_CREATED.status)
        }

        if (!emailSent) {
            throw new AppError(ERROR.EMAILSENT_NOT_CREATED.message, ERROR.EMAILSENT_NOT_CREATED.status)
        }

        return emailSent
    } catch (Err) {
        throw Err
    }
}

export const getCampaignsEmailService = async (req: Request) => {
    try {
        const { campaignId } = req.params

        if (!campaignId) {
            throw new AppError(ERROR.CAMPAIGN_ID_NOT_FOUND.message, ERROR.CAMPAIGN_ID_NOT_FOUND.status)
        }

        const emails = await prisma.emailSent.findMany({
            where: {
                campaignId: Number(campaignId)
            },
            select: {
                id: true,
                subject: true,
                body: true,
                createdAt: true,
                campaignAttachments: true
            },
        })

        if (!emails) {
            throw new AppError(ERROR.EMAILS_NOT_FOUND.message, ERROR.EMAILS_NOT_FOUND.status)
        }
        return emails
    } catch (err) {
        throw err
    }
}