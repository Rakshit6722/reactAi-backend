import axios from "axios";
import { createMimeMessage, CreateMimeMesssgeFormat } from "../createMimeMessage";
import { encodeMessageToBase64Url } from "../encodeMessage";
import { config } from "../../config/env";

export const sendMail = async ({
    to,
    from,
    subject,
    body
}: CreateMimeMesssgeFormat,
    attachments: any[],
    userAccessToken: string) => {
    const rawMime = createMimeMessage({
        to,
        from,
        subject,
        body,
        attachments
    })

    const baseUrl = config.google_send_mail_api

    const base64Message = encodeMessageToBase64Url(rawMime)

    await axios.post(
        baseUrl!,
        {
            raw: base64Message
        },
        {
            headers: {
                Authorization: `Bearer ${userAccessToken}`,
                'Content-Type': 'application/json'
            }
        }
    )

}