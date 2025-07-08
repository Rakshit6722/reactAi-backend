export const SEND_EMAIL_RESPONSE = {
    SUCCESS:{
        EMAIL_SEND:{message:"Email sent successfully", status: 200}
    },
    ERROR:{
        LEAD_NOT_FOUND: {message:"No lead found", status: 404},
        EMAIL_NOT_FOUND: {message:"No email found", status: 404},
        ID_NOT_FOUND: {message:"campaignId or emailSentId are necessary", status: 400}
    }
}