export const CAMPAIGN_RESPONSE = {
    ERRORS: {
        TOKEN_MISSING: { message: "Unauthorized", status: 401 },
        CANT_CREATE_CAMPAIGN: { message: "unable to create campaign", status: 400 },
        CANT_DELETE_CAMPAIGN: { message: "unable to delete campaign", status: 400 },
        DUPLICATE_CAMPAIGN: { message: "campaign with this name already exist", status: 409 },
        CAMPAIGN_NOT_FOUND: { message: "Campaign not found", status: 404 },
        CAMPAIGN_ID_NOT_FOUND: { message: "No campaign id found", status: 422 },
        CANT_UPDATE_CAMPAIGN: { message: "Unable to update campaign", status: 400 },
        CANT_UPDATE_CAMPAIGN_NAME: { message: "Unable to update campaign name", status: 400 },
        CANT_UPDATE_CAMPAIGN_SUBJECT: { message: "Unable to update campaign subject", status: 400 },
        CANT_UPDATE_CAMPAIGN_BODY: { message: "Unable to update campaign body", status: 400 },
    },
    SUCCESS: {
        CREATE_CAMPAIGN_SUCCESS: { message: "Campaign created successfully", status: 201 },
        CAMPAIGN_FOUND: { message: "Campaigns found successfully", status: 200 },
        CAMPAIGN_DELETE: { message: "Campaigns deleted successfully", status: 200 },
        CAMPAIGN_UPDATE: { message: "Campaign updated successfully", status: 200 },
        CAMPAIGN_UPDATE_NAME: { message: "Campaign name updated successfully", status: 200 },
        CAMPAIGN_UPDATE_BODY: { message: "Campaign body updated successfully", status: 200 },
        CAMPAIGN_UPDATE_SUBJECT: { message: "Campaign subject updated successfully", status: 200 }
    }
}