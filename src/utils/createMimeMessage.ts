export type CreateMimeMesssgeFormat = {
    to: string
    from: string
    subject: string
    body: string
    attachments?: any
}

export const createMimeMessage = ({
    to,
    from,
    subject,
    body,
    attachments
}: CreateMimeMesssgeFormat): string => {

    const boundary = "__BOUNDARY__"

    const messageLines = [
        `To: ${to}`,
        `From: ${from}`,
        `Subject: ${subject}`,
        `MIME-Version: 1.0`,
        `Content-Type: multipart/mixed; boundary="${boundary}"`,
        ``,
        `--${boundary}`,
        `Content-Type: text/plain; charset="UTF-8"`,
        `Content-Transfer-Encoding: 7bit`,
        '',
        body
    ]

    for (const attachment of attachments) {
        messageLines.push(
            `--${boundary}`,
            `Content-Type: ${attachment.mimeType}; name="${attachment.filename}"`,
            `Content-Disposition: attachment; filename="${attachment.filename}`,
            `Content-Transfer-Encoding: base64`,
            ``,
            attachment.base64Content
        )
    }

    messageLines.push(`--${boundary}--`)

    return messageLines.join('\n')
}