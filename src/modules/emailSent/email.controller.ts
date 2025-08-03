import { NextFunction, Request, Response } from "express";
import { createEmailSentService, deleteEmailService, getCampaignsEmailService } from "./email.service";
import { EMAIL_RESPONSES } from "../../constants/emailSent.constant";
import { success } from "zod/v4";
import { emailSentSchema } from "./email.validator";

const {SUCCESS} = EMAIL_RESPONSES

export const createEmailSent = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const email = await createEmailSentService(req)
        res.status(SUCCESS.EMAILSENT_CREATED.status).json({
            succes: true,
            data:{
                email
            },
            message: SUCCESS.EMAILSENT_CREATED.message
        })
    }catch(err){
        next(err)
    }
}

export const getCampaignEmails = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const emails = await getCampaignsEmailService(req)
        res.status(SUCCESS.CAMPAIGN_EMAIL_FOUND.status).json({
            success: true,
            data: {
                emails
            },
            message:SUCCESS.CAMPAIGN_EMAIL_FOUND.message
        })

    }catch(Err){
        next(Err)
    }
}

export const deleteEmailSent = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const deletedEmail = await deleteEmailService(req)
        res.status(SUCCESS.EMAILSENT_DELETE.status).json({
            success: true,
            message: SUCCESS.EMAILSENT_DELETE.message
        })
    }catch(err){
        next(err)
    }
}