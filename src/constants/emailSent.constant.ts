export const EMAIL_RESPONSES = {
    SUCCESS: {
        EMAILSENT_CREATED: { message: "Email created successfully", status: 201 },
        CAMPAIGN_EMAIL_FOUND: { message: "Campaign emails found succsessfully", status: 200 },
        EMAILSENT_DELETE: { message: "Email deleted succsessfully", status: 200 },
    },
    ERROR: {
        CAMPAIGN_ID_NOT_FOUND: { message: "Unable to find campaign Id", status: 422 },
        EMAILSENT_NOT_CREATED: { message: "Unable to create email", status: 400 },
        EMAILS_NOT_FOUND: { message: "Unable to find any emails for this campaign", status: 400 },
        CAMPAIGN_NOT_FOUND: { message: "Unable to find any campaign with this id", status: 400 },
        EMAILSENT_DELETE: { message: "Unable to delete email", status: 400 },
        EMAILSENTID_NOT_PRESESNT: { message: "email Id not found", status: 422 },
        EMAIL_NOT_FOUND: { message: "Unable to find email with this id", status: 400 }
    }
}