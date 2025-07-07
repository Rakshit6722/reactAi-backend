import { Request } from "express";
import { jwt } from "../../types/auth";
import { PrismaClient } from "@prisma/client";
import AppError from "../../utils/AppError";
import { CAMPAIGN_RESPONSE } from "../../constants/campaign.constant";
import { LEAD_RESPONSES } from "../../constants/lead.constant";
import { parse } from "csv-parse";

const prisma = new PrismaClient()

const CAMPAIGN_ERRORS = CAMPAIGN_RESPONSE.ERRORS

export const getLeadDetailService = async (req: Request) => {
    try {
        const { leadId } = req.params

        if (!leadId) {
            throw new AppError(LEAD_RESPONSES.ERRORS.LEAD_ID_NOT_FOUND.message, LEAD_RESPONSES.ERRORS.LEAD_ID_NOT_FOUND.status)
        }

        const lead = await prisma.lead.findUnique({
            where: {
                id: Number(leadId)
            }
        })

        if (!lead) {
            throw new AppError(LEAD_RESPONSES.ERRORS.GET_LEAD.message, LEAD_RESPONSES.ERRORS.GET_LEAD.status)
        }

        return lead

    } catch (err) {
        throw err
    }
}

export const getCampaignLeadService = async (req: Request) => {
    try{
        const {campaignId} = req.params

        if(!campaignId){
            throw new AppError(LEAD_RESPONSES.ERRORS.CAMPAIGN_ID_NOT_FOUND.message, LEAD_RESPONSES.ERRORS.CAMPAIGN_ID_NOT_FOUND.status)
        }

        const leads = await prisma.lead.findMany({
            where:{
                campaignId: Number(campaignId)
            }
        })

        if(!leads){
            throw new AppError(LEAD_RESPONSES.ERRORS.LEADS_NOT_FOUND.message, LEAD_RESPONSES.ERRORS.LEADS_NOT_FOUND.status)
        }

        return leads

    }catch(err){
        throw err
    }
}

export const createLeadService = async (req: Request) => {
    try {
        const { campaignId } = req.params
        const { email, firstName, lastName, company } = req.body
        const userId = (req.user as jwt).id

        const campaign = await prisma.campaign.findUnique({
            where: {
                userId: Number(userId),
                id: Number(campaignId)
            }
        })

        if (!campaign) {
            throw new AppError(CAMPAIGN_ERRORS.CAMPAIGN_NOT_FOUND.message, CAMPAIGN_ERRORS.CAMPAIGN_NOT_FOUND.status)
        }

        const existingLead = await prisma.lead.findFirst({
            where: {
                email: email
            }
        })

        if (existingLead) {
            throw new AppError(LEAD_RESPONSES.ERRORS.DUPLICATE_LEAD.message, LEAD_RESPONSES.ERRORS.DUPLICATE_LEAD.status)
        }

        const lead = await prisma.lead.create({
            data: {
                campaignId: campaign.id,
                email,
                firstName,
                lastName,
                company
            }
        })

        return lead
    } catch (err: any) {
        throw err
    }
}

export const createCsvLeadService = async (req: Request) => {
    try {
        const { campaignId } = req.params
        const file = req.file

        if (!file) {
            throw new AppError(LEAD_RESPONSES.ERRORS.MUTLER.FILE_NOT_FOUND.message, LEAD_RESPONSES.ERRORS.MUTLER.FILE_NOT_FOUND.status)
        }

        const csvData = file.buffer.toString('utf-8')

        console.log("csv data", csvData)

        //parse records from csv file
        const records: any[] = await new Promise((resolve, reject) => {
            parse(
                csvData,
                {
                    columns: (header) => header.map((h) => h.trim()),
                    skip_empty_lines: true,
                    trim: true
                },
                (err, output) => {
                    if (err) reject(err);
                    else resolve(output);
                }
            );
        });

        console.log("records", records)

        //extract all emails from records and create an arr out of it
        const emails = records.map((record) => record.email)

        console.log("emails", emails)

        //check for mails that are already present in lead table
        const existingLeads = await prisma.lead.findMany({
            where: {
                email: {
                    in: emails
                }
            },
            select: {
                email: true
            }
        })

        // console.log("existing leads", existingLeads)
        //
        const existingEmails = new Set(existingLeads.map(lead => lead.email))

        const uniqueRecords = records.filter((record) => !existingEmails.has(record.email))

        const leadsToCreate = uniqueRecords.map((record: any) => ({
            email: record.email,
            firstName: record.firstName || null,
            lastName: record.lastName || null,
            company: record.company || null,
            campaignId: Number(campaignId)
        }));

        const newLeads = await prisma.lead.createMany({
            data: leadsToCreate
        });

        console.log("new leads", newLeads)

        if (!newLeads?.count) {
            throw new AppError(LEAD_RESPONSES.ERRORS.DUPLICATE_CSV_LEAD.message, LEAD_RESPONSES.ERRORS.DUPLICATE_CSV_LEAD.status)
        }
        if (!newLeads) {
            throw new AppError(LEAD_RESPONSES.ERRORS.CSV_LEAD_UPLOAD.message, LEAD_RESPONSES.ERRORS.CSV_LEAD_UPLOAD.status)
        }

        return newLeads

    } catch (err: any) {
        throw err
    }
}

export const updateLeadDetailsService = async (req: Request) => {
    try {
        const { leadId } = req.params
        const { email, firstName, lastName, company } = req.body

        const lead = await prisma.lead.update({
            where: {
                id: Number(leadId)
            },
            data: {
                email,
                firstName,
                lastName,
                company
            }
        })

        return lead

    } catch (err) {
        throw err
    }
}
export const deleteLeadService = async (req: Request) => {
    try {
        const { leadId } = req.params

        const lead = await prisma.lead.delete({
            where: {
                id: Number(leadId)
            }
        })

        return lead

    } catch (err) {
        throw err
    }
}

export const sendEmailToggleService = async (req: Request) => {
    try {
        const { leadId } = req.params

        if (!leadId) {
            throw new AppError(LEAD_RESPONSES.ERRORS.LEAD_ID_NOT_FOUND.message, LEAD_RESPONSES.ERRORS.LEAD_ID_NOT_FOUND.status)
        }

        const lead = await prisma.lead.findUnique({
            where: {
                id: Number(leadId)
            }
        });

        if (!lead) {
            throw new AppError(LEAD_RESPONSES.ERRORS.GET_LEAD.message, LEAD_RESPONSES.ERRORS.GET_LEAD.status);
        }

        const updatedLead = await prisma.lead.update({
            where: {
                id: Number(leadId)
            },
            data: {
                shouldSend: !lead.shouldSend
            }
        })


        if(!updatedLead){
            throw new AppError(LEAD_RESPONSES.ERRORS.LEAD_UPDATE.message, LEAD_RESPONSES.ERRORS.LEAD_UPDATE.status)
        }

        return updatedLead

    } catch (err) {
        throw err
    }
}