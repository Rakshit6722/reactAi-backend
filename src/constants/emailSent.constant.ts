export const EMAIL_RESPONSES = {
    SUCCESS:{
        EMAILSENT_CREATED: {message:"Email created successfully", status: 201},
        CAMPAIGN_EMAIL_FOUND: {message:"Campaign emails found succsessfully", status: 200},
    },
    ERROR:{
        CAMPAIGN_ID_NOT_FOUND:{message:"Unable to find campaign Id", status: 422},
        EMAILSENT_NOT_CREATED:{message:"Unable to create email", status: 400},
        EMAILS_NOT_FOUND:{message:"Unable to find any emails for this campaign", status: 400},
    }
}