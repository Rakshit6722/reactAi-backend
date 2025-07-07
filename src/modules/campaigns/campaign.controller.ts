import { NextFunction, Request, Response } from "express";
import { campaignCreateService, deleteCampaignService, getCampaignService, updateCampaignService, getSingleCampaignService, updateCampaignSubjectService, updateCampaignNameService, updateCampaignBodyService } from "./campaign.service";
import { CAMPAIGN_RESPONSE } from "../../constants/campaign.constant";

const { SUCCESS } = CAMPAIGN_RESPONSE

export const createCampaign = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const createdCampaign = await campaignCreateService(req)
        res.status(SUCCESS.CREATE_CAMPAIGN_SUCCESS.status).json({
            success: true,
            data: {
                createdCampaign
            },
            message: SUCCESS.CREATE_CAMPAIGN_SUCCESS.message
        })
    } catch (err: any) {
        next(err)
    }
}

export const getCampaign = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const campaigns = await getCampaignService(req)
        res.status(SUCCESS.CAMPAIGN_FOUND.status).json({
            success: true,
            data: {
                campaign: campaigns
            },
            message: SUCCESS.CAMPAIGN_FOUND.message
        })
    } catch (err: any) {
        next(err)
    }
}

export const deleteCampaign = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const deletedCampaign = await deleteCampaignService(req)
        res.status(SUCCESS.CAMPAIGN_DELETE.status).json({
            success: true,
            message:SUCCESS.CAMPAIGN_DELETE.message
        })
    }catch(err: any){
        next(err)
    }
}

export const updateCampaign = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedCampaign = await updateCampaignService(req);
        res.status(SUCCESS.CAMPAIGN_UPDATE.status).json({
            success: true,
            data: { updatedCampaign },
            message: SUCCESS.CAMPAIGN_UPDATE.message
        });
    } catch (err: any) {
        next(err);
    }
};
export const updateCampaignName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedCampaign = await updateCampaignNameService(req);
        res.status(SUCCESS.CAMPAIGN_UPDATE_NAME.status).json({
            success: true,
            data: { updatedCampaign },
            message: SUCCESS.CAMPAIGN_UPDATE_NAME.message
        });
    } catch (err: any) {
        next(err);
    }
};
export const updateCampaignSubject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedCampaign = await updateCampaignSubjectService(req);
        res.status(SUCCESS.CAMPAIGN_UPDATE_SUBJECT.status).json({
            success: true,
            data: { updatedCampaign },
            message: SUCCESS.CAMPAIGN_UPDATE_SUBJECT.message
        });
    } catch (err: any) {
        next(err);
    }
};
export const updateCampaignBody = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedCampaign = await updateCampaignBodyService(req);
        res.status(SUCCESS.CAMPAIGN_UPDATE_BODY.status).json({
            success: true,
            data: { updatedCampaign },
            message: SUCCESS.CAMPAIGN_UPDATE_BODY.message
        });
    } catch (err: any) {
        next(err);
    }
};

export const getSingleCampaign = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const campaign = await getSingleCampaignService(req);
        res.status(SUCCESS.CAMPAIGN_FOUND.status).json({
            success: true,
            data: { campaign },
            message: SUCCESS.CAMPAIGN_FOUND.message
        });
    } catch (err: any) {
        next(err);
    }
};