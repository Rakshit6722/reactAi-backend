import { NextFunction, Request, Response } from "express";
import { sendEmailService } from "./sendEmail.service";
import { SEND_EMAIL_RESPONSE } from "../../constants/sendEmail.constant";

const { SUCCESS } = SEND_EMAIL_RESPONSE

export const sendEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const emailSend = await sendEmailService(req)
        res.status(SUCCESS.EMAIL_SEND.status).json({
            success: false,
            message: SUCCESS.EMAIL_SEND.message
        })
    } catch (err) {
        next(err)
    }
}