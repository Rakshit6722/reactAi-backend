import { NextFunction, Request, Response } from "express";
import { createCsvLeadService, createLeadService, deleteLeadService, getCampaignLeadService, getLeadDetailService, sendEmailToggleService, updateLeadDetailsService } from "./lead.service";
import { LEAD_RESPONSES } from "../../constants/lead.constant";
import { success } from "zod/v4";

export const createLead = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lead = await createLeadService(req)
        res.status(LEAD_RESPONSES.SUCCESS.SIGNLE_LEAD_CREATE.status).json({
            success: true,
            data: {
                lead
            },
            message: LEAD_RESPONSES.SUCCESS.SIGNLE_LEAD_CREATE.message
        })
    } catch (err: any) {
        next(err)
    }
}

export const uploadLeadCsv = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const leads = await createCsvLeadService(req)

        res.status(LEAD_RESPONSES.SUCCESS.CSV_LEAD_CREATE.status).json({
            success: true,
            data: {
                leads
            },
            message: LEAD_RESPONSES.SUCCESS.CSV_LEAD_CREATE.message
        })
    } catch (err) {
        next(err)
    }
}

export const updateLead = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lead = await updateLeadDetailsService(req)
        res.status(LEAD_RESPONSES.SUCCESS.LEAD_UPDATE.status).json({
            success: true,
            data: {
                lead
            },
            message: LEAD_RESPONSES.SUCCESS.LEAD_UPDATE.message
        })
    } catch (err) {
        next(err)
    }
}
export const deleteLead = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lead = await deleteLeadService(req)
        res.status(LEAD_RESPONSES.SUCCESS.LEAD_DELETE.status).json({
            success: true,
            data: {
                lead
            },
            message: LEAD_RESPONSES.SUCCESS.LEAD_DELETE.message
        })
    } catch (err) {
        next(err)
    }
}

export const getLeadDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lead = getLeadDetailService(req)
        res.status(LEAD_RESPONSES.SUCCESS.LEAD_FOUND.status).json({
            succes: true,
            data: {
                lead
            },
            message: LEAD_RESPONSES.SUCCESS.LEAD_DELETE.message
        })
    } catch (err) {
        next(err)
    }
}

export const getCampaignLeads = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const leads = await getCampaignLeadService(req)
        res.status(LEAD_RESPONSES.SUCCESS.LEADS_FOUND.status).json({
            succes: true,
            data: {
                leads
            },
            message: LEAD_RESPONSES.SUCCESS.LEADS_FOUND.message
        })
    } catch (err) {
        next(err)
    }
}

export const toggleShouldSend = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedLead = await sendEmailToggleService(req)
        res.status(LEAD_RESPONSES.SUCCESS.LEAD_UPDATE.status).json({
            success: true,
            data:{
                lead: updatedLead
            },
            message: LEAD_RESPONSES.SUCCESS.LEAD_UPDATE.message
        })
    } catch (err: any) {
        next(err)
    }
}