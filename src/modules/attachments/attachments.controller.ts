import { NextFunction, Request, Response } from "express";
import { createAttachmentService } from "./attachments.service";
import { ATTACHMENT_RESPONSE } from "../../constants/attachment.constant";

const {SUCCESS} = ATTACHMENT_RESPONSE

export const createAttachment = async (req: Request, res: Response, next: NextFunction):  Promise<void> => {
    try{
        const attachment = await createAttachmentService(req)
        res.status(SUCCESS.ATTACHMENT_CREATED.status).json({
            succes: true,
            data:{
                attachment
            },
            message: SUCCESS.ATTACHMENT_CREATED.message
        })
    }catch(err){
        next(err)
    }
}