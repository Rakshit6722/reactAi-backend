import { Request } from "express";
import AppError from "../../utils/AppError";
import { ATTACHMENT_RESPONSE } from "../../constants/attachment.constant";
import { uploadRawFile } from "../../utils/cloudinary/uploadRawFiles";
import { config } from "../../config/env";
import { uploadImageVideo } from "../../utils/cloudinary/uploadImagesVideos";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const { ERROR } = ATTACHMENT_RESPONSE

export const createAttachmentService = async (req: Request) => {
    try {
        const { file } = req;

        console.log("file", file)

        const { emailSentId } = req.params

        if (!file) {
            throw new AppError(ERROR.FILE_NOT_PRESENT.message, ERROR.FILE_NOT_PRESENT.status);
        }

        const endpoint = req.originalUrl;
        const lastPart = endpoint.split("/").pop();

        let upload: {
            publicId: string;
            secure_url: string;
        } = {
            publicId: "",
            secure_url: ""
        };

        if (lastPart === "raw") {
            const result = await uploadRawFile(file, config.cloudinary_folder_name!);
            upload = {
                publicId: result.publicId,
                secure_url: result.url
            };
        } else if (lastPart === "image-video") {
            const result = await uploadImageVideo(file, config.cloudinary_folder_name!);
            upload = {
                publicId: result.publicId,
                secure_url: result.url
            };
        } else {
            throw new AppError("Invalid upload type. Endpoint must be 'raw' or 'image-video'.", 400);
        }

        const attachment = await prisma.campaignAttachments.create({
            data:{
                 filename: (file as Express.Multer.File).originalname,
                 url: upload.secure_url,
                 emailSentId: Number(emailSentId),
            }
        })

        return attachment
    } catch (err: any) {
        if (err instanceof AppError) {
        }
        throw new AppError(err.message || ERROR.CLOUDINARY_FILE_UPLOAD.message, err.status || 500);
    }
};