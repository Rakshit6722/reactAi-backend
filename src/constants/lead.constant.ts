export const LEAD_RESPONSES = {
    SUCCESS: {
        SIGNLE_LEAD_CREATE: { message: "lead created successfully", status: 201 },
        CSV_LEAD_CREATE: { message: "leads created successfully", status: 201 },
        LEAD_UPDATE: { message: "lead updated successfully", status: 200 },
        LEAD_DELETE: { message: "leads deleted successfully", status: 200 },
        LEAD_FOUND: { message: "leads details found successfully", status: 200 },
        LEADS_FOUND: { message: "leads found successfully", status: 200 },
    },
    ERRORS: {
        SINGLE_LEAD_CREATE: { message: "unable to create lead", status: 400 },
        DUPLICATE_LEAD: { message: "lead with this email accoudn already exist", status: 409 },
        DUPLICATE_CSV_LEAD: { message: "leads with this email account already exist", status: 409 },
        CSV_LEAD_UPLOAD: { message: "unable to create leads through csv", status: 400 },
        GET_LEAD: { message: "unable to get lead details", status: 400 },
        LEAD_ID_NOT_FOUND: { message: "lead id not found", status: 422 },
        LEAD_UPDATE: { message: "unable to update lead", status: 400 },
        MUTLER: {
            FILE_NOT_FOUND: { message: "csv file is required", status: 400 }
        },
        LEADS_NOT_FOUND: { message: "unable to found leads", status: 400 },
        CAMPAIGN_ID_NOT_FOUND: { message: "campaign id not found", status: 422 },
    }
}