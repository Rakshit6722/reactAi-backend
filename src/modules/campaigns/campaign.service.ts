import { PrismaClient } from "@prisma/client"
import { Request } from "express"
import AppError from "../../utils/AppError"
import { CAMPAIGN_RESPONSE } from "../../constants/campaign.constant"
import { jwt } from "../../types/auth"

const prisma = new PrismaClient()

const { ERRORS } = CAMPAIGN_RESPONSE

export const campaignCreateService = async (req: Request) => {
    try {

        if (!req.user) {
            throw new AppError(ERRORS.TOKEN_MISSING.message, ERRORS.TOKEN_MISSING.status)
        }

        const { name, subject, body } = req.body
        const userId = (req.user as jwt).id

        const duplicateCampaign = await prisma.campaign.findFirst({
            where: {
                userId,
                name
            }
        })

        if (duplicateCampaign) {
            throw new AppError(ERRORS.DUPLICATE_CAMPAIGN.message, ERRORS.DUPLICATE_CAMPAIGN.status)
        }

        const campaign = await prisma.campaign.create({
            data: {
                userId,
                name,
                body,
                subject
            }
        })

        if (!campaign) {
            throw new AppError(ERRORS.CANT_CREATE_CAMPAIGN.message, ERRORS.CANT_CREATE_CAMPAIGN.status)
        }

        return campaign
    } catch (err: any) {
        throw err
    }
}

export const getCampaignService = async (req: Request) => {
    try {
        if (!req.user) {
            throw new AppError(ERRORS.TOKEN_MISSING.message, ERRORS.TOKEN_MISSING.status)
        }

        const campaign = await prisma.campaign.findMany({
            where: {
                userId: (req.user as jwt).id
            },
            include: {
                leads: true
            }
        })

        if (!campaign) {
            throw new AppError(ERRORS.CAMPAIGN_NOT_FOUND.message, ERRORS.CAMPAIGN_NOT_FOUND.status)
        }

        return campaign
    } catch (err: any) {
        throw err
    }
}

export const deleteCampaignService = async (req: Request) => {
    try {
        const { id } = req.params
        const userId = (req.user as jwt).id
        if (!id) {
            throw new AppError(ERRORS.CAMPAIGN_ID_NOT_FOUND.message, ERRORS.CAMPAIGN_ID_NOT_FOUND.status)
        }

        const deletedCampaign = await prisma.campaign.delete({
            where: {
                id: Number(id),
                userId: userId
            }
        })

        if (!deletedCampaign) {
            throw new AppError(ERRORS.CANT_DELETE_CAMPAIGN.message, ERRORS.CANT_DELETE_CAMPAIGN.status)
        }

        return deletedCampaign
    } catch (err: any) {
        throw err
    }
}

export const updateCampaignService = async (req: Request) => {
    try {
        const { id } = req.params;
        const userId = (req.user as jwt).id
        if (!id) {
            throw new AppError(ERRORS.CAMPAIGN_ID_NOT_FOUND.message, ERRORS.CAMPAIGN_ID_NOT_FOUND.status);
        }

        const { name, subject, body } = req.body;

        const updatedCampaign = await prisma.campaign.update({
            where: { id: Number(id), userId: userId },
            data: { name, subject, body }
        });

        if (!updatedCampaign) {
            throw new AppError(ERRORS.CANT_UPDATE_CAMPAIGN.message, ERRORS.CANT_UPDATE_CAMPAIGN.status);
        }

        return updatedCampaign;
    } catch (err: any) {
        throw err;
    }
};

export const updateCampaignNameService = async (req: Request) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new AppError(ERRORS.CAMPAIGN_ID_NOT_FOUND.message, ERRORS.CAMPAIGN_ID_NOT_FOUND.status);
        }
        const userId = (req.user as jwt).id
        const { name } = req.body;

        const updatedCampaign = await prisma.campaign.update({
            where: { id: Number(id), userId },
            data: { name: name }
        });

        if (!updatedCampaign) {
            throw new AppError(ERRORS.CANT_UPDATE_CAMPAIGN_NAME.message, ERRORS.CANT_UPDATE_CAMPAIGN_NAME.status);
        }

        return updatedCampaign;
    } catch (err: any) {
        throw err;
    }
}
export const updateCampaignSubjectService = async (req: Request) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new AppError(ERRORS.CAMPAIGN_ID_NOT_FOUND.message, ERRORS.CAMPAIGN_ID_NOT_FOUND.status);
        }
        const userId = (req.user as jwt).id
        const { subject } = req.body;

        const updatedCampaign = await prisma.campaign.update({
            where: { id: Number(id), userId },
            data: { subject }
        });

        if (!updatedCampaign) {
            throw new AppError(ERRORS.CANT_UPDATE_CAMPAIGN_SUBJECT.message, ERRORS.CANT_UPDATE_CAMPAIGN_SUBJECT.status);
        }

        return updatedCampaign;
    } catch (err: any) {
        throw err;
    }
}
export const updateCampaignBodyService = async (req: Request) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new AppError(ERRORS.CAMPAIGN_ID_NOT_FOUND.message, ERRORS.CAMPAIGN_ID_NOT_FOUND.status);
        }
        const userId = (req.user as jwt).id
        const { body } = req.body;

        const updatedCampaign = await prisma.campaign.update({
            where: { id: Number(id), userId },
            data: { body }
        });

        if (!updatedCampaign) {
            throw new AppError(ERRORS.CANT_UPDATE_CAMPAIGN_BODY.message, ERRORS.CANT_UPDATE_CAMPAIGN_BODY.status);
        }

        return updatedCampaign;
    } catch (err: any) {
        throw err;
    }
}

export const getSingleCampaignService = async (req: Request) => {
    try {
        const { id } = req.params;
        const userId = (req.user as jwt).id

        if (!id) {
            throw new AppError(ERRORS.CAMPAIGN_ID_NOT_FOUND.message, ERRORS.CAMPAIGN_ID_NOT_FOUND.status);
        }

        const campaign = await prisma.campaign.findUnique({
            where: { id: Number(id), userId },
            include: {
                leads: true,
                emailSent: true,
            }
        });

        if (!campaign) {
            throw new AppError(ERRORS.CAMPAIGN_NOT_FOUND.message, ERRORS.CAMPAIGN_NOT_FOUND.status);
        }

        return campaign;
    } catch (err: any) {
        throw err;
    }
};