import { Worker, Job } from "bullmq";
import { connection } from "../config/redis";
import { sendMail } from "../utils/sendEmailToLeads/sendMail";
import { refreshAccessToken } from "../utils/gmail/refreshAccessToken";
import { convetToBase64 } from "../utils/cloudinary/convertCloudinaryUrlToBase64";
import mime from 'mime-types'

const sendEmailToLead = async (job: Job) => {
    const { lead, emailSent, userName, userEmail, userRefreshToken } = job.data

    const { accessToken } = await refreshAccessToken(userRefreshToken)

    console.log("attachments", Array.isArray(emailSent.campaignAttachments))

    const attachments = await Promise.all(
        emailSent.campaignAttachments?.map(async (attachment) => ({
            filename: attachment.filename,
            base64Content: await convetToBase64(attachment.url),
            mimeType: mime.lookup(attachment.filename) || "application/octet-stream"
        }
        ))
    )

    await sendMail({
        to: lead.email,
        from: userName,
        subject: emailSent.subject,
        body: emailSent.body
    },
        attachments,
        accessToken)

    console.log("📧 Processing email job for lead:", lead.email)
    console.log("📧 Email subject:", emailSent.subject)
    console.log("📧 Job ID:", job.id)
}

export const emailWorker = new Worker(
    "email-sender",
    async (job) => {
        console.log("🚀 Email worker started processing job:", job.id)
        await sendEmailToLead(job)
        console.log("✅ Email job completed for:", job.data.lead.email)
    },
    { connection }
)

// Add event listeners for better debugging
emailWorker.on('completed', (job) => {
    console.log('✅ Job completed:', job.id)
})

emailWorker.on('failed', (job, err) => {
    console.log('❌ Job failed:', job?.id, err.message)
})

emailWorker.on('error', (err) => {
    console.log('❌ Worker error:', err.message)
})

console.log("📧 Email worker initialized and ready to process jobs")