export const ROUTES = {
    AUTH: {
        ROOT: "/api/auth",
        SIGNUP: "/signup",
        LOGIN: "/login",
        PROFILE: "/profile",
        GOOGLE: "/google",
        GOOGLE_CALLBACK: "/google/callback",
        FORGOT_PASSWORD:"/forgot-password",
        RESET_PASSWORD:"/reset-password",
        LOGOUT:'/logout'
    },
    CAMPAIGN:{
        ROOT:"/api/campaign",
        CREATE:"/",
        GET:"/",
        GET_SINGLE:"/:id",
        UPDATE:"/:id",
        UPDATE_NAME:"/name/:id",
        UPDATE_BODY:"/body/:id",
        UPDATE_SUBJECT:"/subject/:id",
        DELETE:"/:id"
    },
    LEADS:{
        ROOT:"/api",
        CREATE_SINGLE:"/campaigns/:campaignId/leads",
        CREATE_BULK:"/campaigns/:campaignId/leads/upload",
        UPDATE:"/leads/:leadId",
        TOGGLE_SHOULDSEND:"/leads/toggle/:leadId",
        DELETE:"/leads/:leadId",
        GET_LEAD:"/leads/:leadId",
        GET_ALL_LEADS:"/campaign/leads/:campaignId"
    },
    EMAILSENT:{
        ROOT:"/api",
        CREATE_EMAIL:"/campaign/:campaignId/create-email",
        GET_CAMPAIGN_EAIL:"/campaign/:campaignId/get-email",
    },
    ATTACHMENTS:{
        ROOT:"/api",
        RAW_FILES_UPLOAD:"/emailAttachment/:emailSentId/raw",
        IMAGES_VIDEOS_UPLOAD:"/emailAttachment/:emailSentId/image-video",
    }
}